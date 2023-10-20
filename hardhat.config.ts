import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config } from "dotenv";

config();

const configuration: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./solidity/contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./solidity/artifacts"
  },
  networks: {
    mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      accounts: [`${process.env.SECRET_KEY}`],
    },
    optimism_goerli: {
      url: `https://goerli.optimism.io`,
      accounts: [`${process.env.SECRET_KEY}`],
    },
    scroll: {
      url: `https://rpc.ankr.com/scroll_sepolia_testnet`,
      accounts: [`${process.env.SECRET_KEY}`],
    }
  },
};

export default configuration;
