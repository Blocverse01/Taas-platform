This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Ensure you have the right node version:

### Using NVM

A .nvmrc file has been added to make it convenient to get the right nodejs version for this project. Use the nvm use command to tell NVM to use node version in the configuration file

```bash
nvm use
```

### Not Using NVM

Checkout the `engines` field in `package.json` to get the required node.js version

Next run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


TODO

Change Price Should Be a MultSig
Change Property Name
Change Token Ticker
Add Time Lock
Add Functionality to Change Price, PropertyName and TokenTicker on contract
Upgradeable Smart Contracts for backwards compatibility (AssetFactory, AssetToken)