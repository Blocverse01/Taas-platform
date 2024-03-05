import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { SmartAccountClient, WalletClientSigner, polygon, polygonMumbai } from "@alchemy/aa-core";
import { getWalletClient } from "@/resources/utils/web3/connection";
import { WEB3_ENVIRONMENT } from "@/resources/utils/web3/environment";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const ALCHEMY_GAS_POLICY_ID = process.env.NEXT_PUBLIC_ALCHEMY_GAS_POLICY_ID;

const chain = WEB3_ENVIRONMENT === 'mainnet' ? polygon : polygonMumbai;

let smartAccountClientInstance: SmartAccountClient | undefined;

const getSmartAccountClient = async () => {
    if (smartAccountClientInstance) return smartAccountClientInstance;

    smartAccountClientInstance = await createSmartAccount();

    return smartAccountClientInstance;
}

const createSmartAccount = async () => {
    if (!ALCHEMY_API_KEY) throw new Error('Configure `NEXT_PUBLIC_ALCHEMY_API_KEY`');

    if (!ALCHEMY_GAS_POLICY_ID) throw new Error('Configure `NEXT_PUBLIC_ALCHEMY_GAS_POLICY_ID`');

    const client = getWalletClient();

    const eoaSigner = new WalletClientSigner(
        client,
        "json-rpc" //signerType
    );

    return await createModularAccountAlchemyClient({
        chain,
        apiKey: ALCHEMY_API_KEY,
        signer: eoaSigner,
        gasManagerConfig: {
            policyId: ALCHEMY_GAS_POLICY_ID
        },
    })
}

const getSmartAccountAddress = async () => {
    const client = await getSmartAccountClient();

    const smartAccountAddress = client.account?.address;

    if (!smartAccountAddress) throw new Error('No address found');

    return smartAccountAddress;
}

export { getSmartAccountClient, getSmartAccountAddress }
