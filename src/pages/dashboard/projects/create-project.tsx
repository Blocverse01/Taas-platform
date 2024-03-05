import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { Input } from '@/components/formPrimitives/input';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';
import SubPageLayout from '@/components/layout/subPageLayout';
import toast from 'react-hot-toast';
import { storeProjectItem } from '@/data/adapters/browser/taas-web/project';
import { deploySafe } from '@/data/adapters/browser/safe/deploySafe';
import { getSession } from 'next-auth/react';
import { deployTokenFactory } from '@/data/adapters/browser/taas-web/tokenFactory/deployTokenFactory';
import { Address } from 'viem';
import { saveToProjectActivityLog } from '@/data/adapters/browser/taas-web/activityLog';
import {
  ActivityLogCategory,
  ActivityLogProjectSubCategory,
} from '@/data/adapters/server/taas-api/activityLog/types';
import { createActivityLogTitle } from '@/data/adapters/browser/taas-web/activityLog/utils';
import { getTransactionExplorerUrl } from '@/resources/utils/web3/connection';
import { useRouter } from 'next/router';
import { getSmartAccountAddress } from '@/data/adapters/browser/alchemy/modularSmartAccount';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  assetType: Yup.string().required('Asset type is required'),
  treasuryWallet: Yup.string().required('Treasury Wallet is required'),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const assetOptions = [
  { value: 'realestate', label: 'Real Estate' },
  { value: 'startupinvestment', label: 'Startup Investment' },
  { value: 'bluegreenbond', label: 'Blue/Green Bonds' },
  { value: 'antiques', label: 'Antiques' },
];

const CreateProject: NextPageWithLayout = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    name: '',
    assetType: '',
    treasuryWallet: '',
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const toastOptions = { id: 'generate-api-key' };

        try {
          toast.loading('Generating a project', toastOptions);

          const session = await getSession();

          if (!session) {
            toast.dismiss(toastOptions.id);

            toast.error('Please login again');

            await router.push('/login');

            return;
          }

          // const safeAddress = await deploySafe([session.user.walletAddress], 1);
          //Do not uncomment or delete this line until multisig has been implemented 100%

          const userSmartAccountAddress = await getSmartAccountAddress();

          const { tokenFactory, txHash, actor } = await deployTokenFactory(
            userSmartAccountAddress,
            values.treasuryWallet as Address
          );

          const project = await storeProjectItem({
            ...values,
            multiSigController: userSmartAccountAddress,
            tokenFactory,
          });

          await saveToProjectActivityLog(project.id, {
            actor,
            title: createActivityLogTitle(
              ActivityLogProjectSubCategory['deployFactory'],
              project.name
            ),
            category: ActivityLogCategory['project'],
            ctaLink: getTransactionExplorerUrl(txHash),
            ctaText: 'View Transaction',
            subCategory: ActivityLogProjectSubCategory['deployFactory'],
          });

          toast.success('Project generated successfully', toastOptions);

          resetForm();

          await router.push(`/dashboard`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

          toast.error(errorMessage, toastOptions);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isValid, isSubmitting, setFieldValue }) => (
        <Form className=" space-y-4 max-w-[430px] w-full">
          <Input
            className="text-t-black text-sm"
            placeholder="Add Project Name"
            label="Project Name"
            type="text"
            name="name"
            id="name"
          />

          <div>
            <label htmlFor="assetType" className="block mb-4 text-t-black ">
              Type of Asset
            </label>
            <Select
              styles={{
                control(base) {
                  base.backgroundColor = '#FAFAFA';
                  base.padding = '8px';
                  base.borderRadius = '4px';
                  base.border = 'none';
                  base.color = '#474747';
                  base.fontSize = '14px';
                  base.fontWeight = 'normal';

                  return base;
                },
              }}
              placeholder="Select an asset"
              options={assetOptions}
              isOptionDisabled={(option) => option.value !== 'realestate'}
              onChange={(assetOption) => {
                if (!assetOption) return null;
                setFieldValue('assetType', assetOption.value);
              }}
            />
            <ErrorMessage name="assetType" component="div" className="text-red-500" />
          </div>

          <div>
            <Input
              className="text-t-black text-sm"
              placeholder="Add Treasury Wallet"
              label="Treasury Wallet"
              type="text"
              name="treasuryWallet"
              id="treasuryWallet"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard"
              type="button"
              className="text-white py-[18px] px-[70px] text-[18px] rounded bg-t-black"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-t-purple text-white cursor-pointer text-[18px] py-[18px] px-x rounded w-full"
            >
              Add Project
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

CreateProject.getLayout = (page) => <SubPageLayout>{page}</SubPageLayout>;
export default CreateProject;
