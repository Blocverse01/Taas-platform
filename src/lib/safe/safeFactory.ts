import { SafeFactory } from '@safe-global/protocol-kit'
import { getEthersAdapter } from './ethersAdapter';

let safeFactoryInstance: SafeFactory | undefined;

const getSafeFactory = async () => {
  if (!safeFactoryInstance) {
    const ethersAdapter = getEthersAdapter();
    safeFactoryInstance = await SafeFactory.create({ ethAdapter: ethersAdapter });
  }
  return safeFactoryInstance;
}

export { getSafeFactory }