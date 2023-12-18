import Safe from '@safe-global/protocol-kit'
import { getEthersAdapter } from './ethersAdapter';
import { Address } from 'viem';

let safeSdkInstance: Safe | undefined;

const getSafe = async (safeAddress: Address) => {
  if (!safeSdkInstance) {
    //We retrieve the ethersAdapter which was created ising the currently logged in user
    const ethAdapter = getEthersAdapter();
    //Using the ethersAdapter and safe address, we create an instance of the safe of the safe SDK, to interact with the sfw wallet
    safeSdkInstance = await Safe.create({ ethAdapter, safeAddress })
  }
  return safeSdkInstance;
}

export { getSafe }