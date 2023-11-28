import { Address } from "viem";
import { getWalletClient } from "./viemClients"

let account: Address | undefined;

const getAccount = async () => {
  if (account) return account;

  const walletClient = getWalletClient();
  account = (await walletClient.getAddresses())[0];

  return account;
}

export { getAccount };