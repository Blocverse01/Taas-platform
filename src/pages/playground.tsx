import { useLocalStorage } from 'usehooks-ts';
import { NextPageWithLayout } from './_app';
import { deploySafe } from '@/data/adapters/browser/safe/deploySafe';
import { getSession } from 'next-auth/react';
import { deployTokenFactory } from '@/data/adapters/browser/taas-web/tokenFactory/deployTokenFactory';
import { useState } from 'react';
import SubPageLayout from '@/components/layout/subPageLayout';
import { tokenizeAsset } from '@/data/adapters/browser/taas-web/tokenFactory/tokenizeAsset';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { createIssueTokenAssetTransaction } from '@/data/adapters/browser/taas-web/token/createIssueTokenTransaction';
import { Address } from 'viem';
import { Input } from '@/components/formPrimitives/input';
import { executeIssueTokenTransaction } from '@/data/adapters/browser/taas-web/token/issueToken';

const DEMO_TREASURY_WALLET = '0x622eDE672dC30A7cB40CDA9461f8e64fA39bA929' as const;

function bigIntReplacer(key: string, value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString(); // Convert BigInt to string
  }
  return value;
}

interface PlaygroundConfig {
  safeAddress: Address;
  tokenFactory: Address;
  tokenAddress: Address;
}

const PlayGround: NextPageWithLayout = () => {
  const [playgroundConfig, setPlaygroundConfig] = useLocalStorage<Partial<PlaygroundConfig>>(
    'playgroundConfig',
    {}
  );
  const [playgroundError, setPlaygroundError] = useState<string>();
  const [issueTokenTxHash, setIssueTokenTxHash] = useLocalStorage<string>('issueTokenTxHash', '');

  const updatePlaygroundConfig = (key: keyof PlaygroundConfig, value: Address) => {
    setPlaygroundConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const initializePlayground = async () => {
    const session = await getSession();
    if (!session) return;

    const toastId = toast.loading('Initializing playground');
    try {
      const safeAddress =
        playgroundConfig.safeAddress ?? (await deploySafe([session.user.walletAddress], 1));

      updatePlaygroundConfig('safeAddress', safeAddress);
      toast.success(`Safe Deployed`);

      const { tokenFactory } = playgroundConfig.tokenFactory
        ? { tokenFactory: playgroundConfig.tokenFactory }
        : await deployTokenFactory(safeAddress, DEMO_TREASURY_WALLET);

      updatePlaygroundConfig('tokenFactory', tokenFactory);
      toast.success(`Token Factory Deployed`);

      const { tokenAddress } = playgroundConfig.tokenAddress
        ? { tokenAddress: playgroundConfig.tokenAddress }
        : await tokenizeAsset(tokenFactory, 'TEST', 500, 'Test Token');

      updatePlaygroundConfig('tokenAddress', tokenAddress);
      toast.success(`Token Deployed`);

      toast.dismiss(toastId);
      toast.success('Initialization completed');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Initialization failed');

      const stringifiedError = JSON.stringify(error, bigIntReplacer, 2);

      setPlaygroundError(stringifiedError === '{}' ? String(error) : stringifiedError);
    }
  };

  const createIssueTokenTx = async (destinationWallet: Address, amount: number) => {
    if (
      !playgroundConfig.safeAddress ||
      !playgroundConfig.tokenAddress ||
      !playgroundConfig.tokenFactory
    )
      return;

    const toastId = toast.loading('Creating Transaction');
    try {
      const { txHash } = await createIssueTokenAssetTransaction(playgroundConfig.safeAddress, {
        tokenAddress: playgroundConfig.tokenAddress,
        tokenFactory: playgroundConfig.tokenFactory,
        destinationWallet: destinationWallet,
        amount: amount,
      });

      setIssueTokenTxHash(txHash);

      toast.dismiss(toastId);
      toast.success(`Tx Created, Hash: ${txHash}`);
    } catch (error) {
      console.log(error);

      toast.dismiss(toastId);
      toast.error('Creating Tx failed');

      setPlaygroundError(JSON.stringify(error, null, 2));
    }
  };

  const executeIssueTokenTx = async () => {
    if (!playgroundConfig.safeAddress || !issueTokenTxHash) return;

    const toastId = toast.loading('Executing Transaction');
    try {
      const { txHash } = await executeIssueTokenTransaction(
        playgroundConfig.safeAddress,
        issueTokenTxHash as Address
      );

      console.log(txHash);

      toast.dismiss(toastId);
      toast.success(`Tx Executed, Hash: ${txHash}`);
    } catch (error) {
      console.log(error);

      toast.dismiss(toastId);
      toast.error('Executing Tx failed');

      setPlaygroundError(JSON.stringify(error, null, 2));
    }
  };

  const isInitialized =
    Object.values(playgroundConfig).filter((value) => value !== undefined).length === 3;

  return (
    <section className="grid grid-cols-2 gap-6 max-w-[1380px] mx-auto">
      <section className="flex flex-col border rounded p-5 shadow-md items-center justify-center gap-8">
        {!isInitialized && (
          <div>
            <button
              onClick={initializePlayground}
              className="bg-t-purple py-[18px] px-[68px] rounded text-white w-fit mx-auto"
            >
              Initialize Token Factory
            </button>
          </div>
        )}

        {isInitialized && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="mb-2">Safe Address</h3>
                <p className="text-t-black p-5 bg-gray-200 rounded border-gray-400">
                  {playgroundConfig.safeAddress}
                </p>
              </div>
              <div>
                <h3 className="mb-2">Token Factory</h3>
                <p className="text-t-black p-5 bg-gray-200 rounded border-gray-400">
                  {playgroundConfig.tokenFactory}
                </p>
              </div>
              <div>
                <h3 className="mb-2">Token Address</h3>
                <p className="text-t-black p-5 bg-gray-200 rounded border-gray-400">
                  {playgroundConfig.tokenAddress}
                </p>
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-lg text-t-black font-medium">Create Issue Token Transaction</h3>
              <div>
                <Formik
                  initialValues={{
                    destinationWallet: '',
                    amount: 0,
                  }}
                  onSubmit={async (values, {}) => {
                    await createIssueTokenTx(values.destinationWallet as Address, values.amount);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <Input name="destinationWallet" type="text" label="Destination Wallet" />
                      <Input name="amount" type="number" label="Amount" />
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-t-purple py-[18px] px-[68px] rounded text-white w-full mx-auto"
                      >
                        Issue Token
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <section>
              <button
                onClick={executeIssueTokenTx}
                type="button"
                className="bg-t-purple py-[18px] px-[68px] rounded text-white w-full mx-auto"
              >
                Execute Issue Token Transaction
              </button>
            </section>
          </div>
        )}
      </section>

      {playgroundError && (
        <div className="bg-black text-white p-6">
          <h3 className="border-b mb-4 border-b-t-gray-8 pb-3">Error Log</h3>
          <p className="break-words">{playgroundError}</p>
        </div>
      )}
    </section>
  );
};

PlayGround.getLayout = (page) => <SubPageLayout>{page}</SubPageLayout>;

export default PlayGround;
