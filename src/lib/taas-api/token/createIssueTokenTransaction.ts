import { getSafeService } from "@/lib/safe";
import { getSafeDetails } from "@/lib/safe/getSafeDetails";
import { proposeTransaction } from "@/lib/safe/transactions";
import { validateSignatory } from "@/lib/safe/validateSafeSigner";
import { ISSUE_TOKEN_CONTRACT_FUNCTION_NAME, ZERO, assetPropertyRepository, assetTransactionRepository, authorizationRequestRepository, projectRepository } from "@/utils/constants";
import MailService from "@/utils/email";
import { getAuthorizationRequestMailOption } from "@/utils/email/helpers";
import { AssetTransactionStatus, AssetTransactionType, AuthorizationRequest } from "@/utils/enums";
import { getConcatenatedId } from "@/utils/helperfunctions";
import { PLATFORM_ENTRY } from "@/utils/web3/abis";
import { utils } from "@/utils/web3/utils";
import { AddressZero } from "@biconomy/common";
import Safe from "@safe-global/protocol-kit";
import { OperationType, SafeTransactionData, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { Address, encodeFunctionData } from "viem";

export const createIssueTokenAssetTransaction = async (
    projectId: string,
    tokenId: Address,
    destinationWallet: Address,
    amount: number) => {

    const asset = await assetPropertyRepository().read(tokenId, ['project.*', "*"]);

    if (!asset || !asset.project) {
        throw new Error(!asset ? "Invalid token identifier" : "Reference to Invalid project");
    }

    const { project } = asset;

    const { currentUser, safe } = await validateSignatory(project.multisigController as Address);

    const functionArgs = [
        asset.project.tokenFactory as Address,
        asset.tokenAddress as Address,
        destinationWallet,
        utils.parseEther(`${amount}`),
        AddressZero,
    ] as const;

    const encodedData = encodeFunctionData({
        abi: PLATFORM_ENTRY,
        functionName: ISSUE_TOKEN_CONTRACT_FUNCTION_NAME,
        args: functionArgs
    });

    //propose transaction on safe
    const safeTransactionData: SafeTransactionDataPartial = {
        operation: OperationType.Call,
        data: encodedData,
        to: asset.tokenAddress,
        value: ""
    };

    const {safeTxHash, nonce} = await proposeTransaction(
        safeTransactionData,
        safe,
        project.multisigController as Address,
        currentUser.user.walletAddress as Address
    );

    //Create a transaction on xata for the token
    const transaction = await assetTransactionRepository().create({
        asset: tokenId,
        status: AssetTransactionStatus.Pending,
        type: AssetTransactionType.IssueToken,
        createdBy: currentUser.user.id,
        amount,
        safeTransactionHash: safeTxHash,
        safeTransactionNonce : nonce
    });

    //get authorizers from the wallet
    const teamDetails = await getSafeDetails(project.multisigController as Address);

    //Send authorizers a mail
    for (let index = ZERO; index < teamDetails.signers.length; index++) {

        const signer = teamDetails.signers[index];

        const authorizationRequestId = getConcatenatedId(signer.userId, transaction.id);

        const authorizationRequest = await authorizationRequestRepository().create(authorizationRequestId, {
            signer: signer.userId,
            transaction: transaction.id,
            status: AuthorizationRequest.Pending
        });

        const link = `${process.env.HOST_LINK}/authorization?projectId=${projectId}&requestId=${authorizationRequest.id}`;

        const mailOptions = getAuthorizationRequestMailOption(
            {
                email: signer.email,
                firstname: signer.firstname,
                projectName: project.name,
                assetName: asset.name,
                link
            });

        (await MailService.getTransporter()).sendMail(mailOptions, (error) => {
            if (error) {
                throw new Error("An Error occurred\nNo email sent!");
            }
        });
    };
}