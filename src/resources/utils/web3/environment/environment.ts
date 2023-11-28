export type Web3Environment = "testnet" | "mainnet";

const envValue = process.env.NEXT_PUBLIC_WEB3_ENVIRONMENT;

const WEB3_ENVIRONMENT: Web3Environment = envValue && (envValue === "testnet" || envValue === "mainnet") ? envValue as Web3Environment : "mainnet";

export { WEB3_ENVIRONMENT }