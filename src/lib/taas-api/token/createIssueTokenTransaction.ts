import { getSafeDetails } from "@/lib/safe/getSafeDetails";
import { validateSignatory } from "@/lib/safe/validateSafeSigner";
import { assetPropertyRepository, assetTransactionRepository, authorizationRequestRepository, projectRepository } from "@/utils/constants";
import MailService from "@/utils/email";
import { getAuthorizationRequestMailOption } from "@/utils/email/helpers";
import { AssetTransactionStatus, AssetTransactionType, AuthorizationRequest } from "@/utils/enums";
import { getConcatenatedId } from "@/utils/helperfunctions";
import { Address } from "viem";

export const createIssueTokenAssetTransaction = async (
    projectId: string,
    tokenId: Address,
    amount: number) => {

    const asset = await assetPropertyRepository().read(tokenId, ['project.*', "name"]);

    if (!asset || !asset.project) {
        throw new Error("");
    }

    const { project } = asset;

    const { currentUser } = await validateSignatory(project.multisigController as Address);

    //Create a transaction on xata for the token
    const transaction = await assetTransactionRepository().create({
        asset: tokenId,
        status: AssetTransactionStatus.Pending,
        type: AssetTransactionType.IssueToken,
        createdBy: currentUser.user.id,
        amount
    });

    //get authorizers from the wallet
    const teamDetails = await getSafeDetails(project.multisigController as Address);

    const link = `${process.env.HOST_LINK}/authorization?projectId=${projectId}`;

    //Send authorizers a mail
    for (let index = 0; index < teamDetails.signers.length; index++) {

        const signer = teamDetails.signers[index];

        const authorizationRequestId = getConcatenatedId(signer.userId, transaction.id);

        await authorizationRequestRepository().create(authorizationRequestId, {
            signer: signer.userId,
            transaction: transaction.id,
            status: AuthorizationRequest.Pending
        })

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