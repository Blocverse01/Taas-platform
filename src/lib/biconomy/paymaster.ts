import { BiconomyPaymaster } from "@biconomy/paymaster";

const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
if (!paymasterUrl) throw new Error("Paymaster URL not configured");

let paymaster: BiconomyPaymaster | undefined;

const getPaymaster = () => {
  if (paymaster) return paymaster;

  paymaster = new BiconomyPaymaster({
    paymasterUrl: paymasterUrl,
  });

  return paymaster;
};

export { getPaymaster };
