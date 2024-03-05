export const PLATFORM_ENTRY = 
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tokenFactoryImplementation",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_tokenImplementation",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ERC1167FailedCreateClone",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        }
      ],
      "name": "FactoryCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "contract AssetTokenFactory",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        }
      ],
      "name": "addERC20PaymentMethod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract AssetTokenFactory",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_tokenName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenSymbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_tokenOfferingPrice",
          "type": "uint256"
        }
      ],
      "name": "createToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetAdmin",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_tokenController",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        }
      ],
      "name": "createTokenFactory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract AssetTokenFactory",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "destinationWallet",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "issueToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract AssetTokenFactory",
          "name": "factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "removeERC20PaymentMethod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenFactoryImplementation",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenImplementation",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;
