import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import Select from "react-select";
import { Input } from "@/components/formPrimitives/input";
import classNames from "classnames";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import SubPageLayout from "@/components/layout/subPageLayout";
import toast from "react-hot-toast";
import { storeProjectItem } from "@/utils/projectIntegration";
import { deploySafe } from "@/lib/safe/deploySafe";
import { getSession } from "next-auth/react";
import { deployTokenFactory } from "@/lib/taas-api/tokenFactory/deployTokenFactory";
import { Address } from "viem";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    assetType: Yup.string().required("Asset type is required"),
    blockchain: Yup.string().required("Blockchain is required"),
    treasuryWallet: Yup.string().required("Treasury Wallet is required"),
});

const blockchainOptions = [
    { value: 'optimism', label: 'Optimism' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'scroll', label: 'Scroll' }
];

const assetOptions = [
    { value: 'realestate', label: 'Real Estate' },
    { value: 'startupinvestment', label: 'Startup Investment' },
    { value: 'bluegreenbond', label: 'Blue/Green Bonds' },
    { value: 'antiques', label: 'Antiques' }
]

const CreateProject: NextPageWithLayout = () => {
    const initialValues = {
        name: "",
        blockchain: "",
        assetType: "",
        treasuryWallet: ""
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                const toastOptions = { id: "generate-api-key" };
                try {
                    toast.loading("Generating a project", toastOptions);

                    const session = await getSession();

                    if (!session) {
                        throw new Error("");
                    }

                    const safeAddress = await deploySafe([session?.user.walletAddress], 1);

                    const { tokenFactory } = await deployTokenFactory(safeAddress, values.treasuryWallet as Address);

                    await storeProjectItem({ ...values, multiSigController: safeAddress, tokenFactory });

                    toast.success("Project generated successfully", toastOptions);

                    resetForm();
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : "Something went wrong";
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
                        placeholder="Johnny Jones"
                        label="Project Name"
                        type="text"
                        name="name"
                        id="name"
                    />

                    <div>
                        <label
                            htmlFor="assetType"
                            className="block mb-4 text-t-black "
                        >
                            Type of Asset
                        </label>
                        <Select
                            styles={{
                                control(base) {
                                    base.backgroundColor = "#FAFAFA";
                                    base.padding = "8px";
                                    base.borderRadius = "4px";
                                    base.border = "none";
                                    base.color = "#474747";
                                    base.fontSize = "14px";
                                    base.fontWeight = "normal";

                                    return base;
                                },
                            }}
                            placeholder="Select an asset"
                            options={assetOptions}
                            isOptionDisabled={(option) => option.value !== "realestate"}
                            onChange={(assetOption) => {
                                if (!assetOption) return null;
                                setFieldValue("assetType", assetOption.value);
                            }}
                        />
                        <ErrorMessage
                            name="assetType"
                            component="div"
                            className="text-red-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="blockchain"
                            className="block mb-4 text-t-black"
                        >
                            Blockchain(select blockchain)
                        </label>
                        <Select
                            styles={{
                                control(base) {
                                    base.backgroundColor = "#FAFAFA";
                                    base.padding = "8px";
                                    base.borderRadius = "4px";
                                    base.border = "none";
                                    base.color = "#474747"
                                    base.fontSize = "14px";
                                    base.fontWeight = "normal";

                                    return base;
                                },
                            }}
                            placeholder="Select Blockchain"
                            options={blockchainOptions}
                            onChange={(blockchainOption) => {
                                if (!blockchainOption) return null;
                                setFieldValue("blockchain", blockchainOption.value);
                            }}
                        />
                        <ErrorMessage
                            name="blockchain"
                            component="div"
                            className="text-red-500"
                        />
                    </div>

                    <Input
                        className="text-t-black text-sm mb-6"
                        placeholder="Add Treasury Wallet"
                        label="Treasury Wallet"
                        type="text"
                        name="treasuryWallet"
                        id="treasuryWallet"
                    />
                    <div
                        className="grid grid-cols-2 gap-4"
                    >
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
