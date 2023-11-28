import SafeApiKit from '@safe-global/api-kit'
import { getEthersAdapter } from './ethersAdapter';
import { getSafeServiceUrl } from '../../../../resources/utils/web3/connection';

let safeServiceInstance: SafeApiKit | undefined;
const getSafeService = () => {
  if (safeServiceInstance) return safeServiceInstance;

  const ethAdapter = getEthersAdapter();
  safeServiceInstance = new SafeApiKit({ txServiceUrl: getSafeServiceUrl(), ethAdapter });

  return safeServiceInstance;
}

export { getSafeService }