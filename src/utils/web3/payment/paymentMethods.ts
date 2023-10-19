import { Address } from "viem";
import usdcLogo from "@/assets/usdcLogo.svg";
import usdtLogo from "@/assets/usdtLogo.svg";
import eurocLogo from "@/assets/eurocLogo.svg";
import { SupportedAsset } from "../assets";
import { WEB3_ENVIRONMENT } from "../environment";

export interface PaymentMethod extends SupportedAsset {
  symbol: Exclude<SupportedAsset["symbol"], "MATIC">;
  tokenAddress: Address;
}
type TokenAddressEnvMap = {
  [key in PaymentMethod["symbol"]]: {
    [key in typeof WEB3_ENVIRONMENT]: Address;
  };
};

const tokenAddressEnvMap: TokenAddressEnvMap = {
  USDC: {
    testnet: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
    mainnet: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  },
  USDT: {
    testnet: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
    mainnet: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  },
  EUROC: {
    testnet: "0x50EE752a63D3b635EdAad668045CE58BB9d394d0",
    mainnet: "0x4d0B6356605e6FA95c025a6f6092ECcf0Cf4317b",
  },
};

let idCounter = 0;

const paymentMethods: Array<PaymentMethod> = [
  {
    id: ++idCounter,
    symbol: "USDC",
    logo: usdcLogo.src,
    tokenAddress: tokenAddressEnvMap["USDC"][WEB3_ENVIRONMENT],
  },
  {
    id: ++idCounter,
    symbol: "EUROC",
    logo: eurocLogo.src,
    tokenAddress: tokenAddressEnvMap["EUROC"][WEB3_ENVIRONMENT],
  },
  {
    id: ++idCounter,
    symbol: "USDT",
    logo: usdtLogo.src,
    tokenAddress: tokenAddressEnvMap["USDT"][WEB3_ENVIRONMENT],
  },
];

const getPaymentMethods = () => paymentMethods;
const getPaymentMethod = (paymentMethodId: number) => {
  const paymentMethod = paymentMethods.find((pm) => pm.id === paymentMethodId);

  if (!paymentMethod) throw new Error("Invalid payment method");

  return paymentMethod;
};

export { getPaymentMethods, getPaymentMethod };
