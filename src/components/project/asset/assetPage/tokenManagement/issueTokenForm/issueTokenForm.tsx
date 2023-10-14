import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Address, isAddress } from "viem";
import { FC, useEffect } from "react";
import { Input } from "@/components/formPrimitives/input";
import classNames from "classnames";

interface IssueTokenFormProps {
  handleIssueToken: (destinationAddress: Address, amount: number) => Promise<void>;
  backButton?: React.ReactNode;
  submitButtonText: string;
}

const issueTokenValidationSchema = Yup.object().shape({
  destinationWallet: Yup.string()
    .required("wallet address is required")
    .test({
      name: "is-address",
      test: (value): value is Address => {
        return isAddress(value);
      },
      message: "Invalid address format",
    }),
  amount: Yup.number().required().positive().integer(),
});

type Values = Yup.InferType<typeof issueTokenValidationSchema>;

const IssueTokenForm: FC<IssueTokenFormProps> = ({ handleIssueToken, backButton, submitButtonText }) => {
  useEffect(() => {
    document.getElementById("destination")?.focus();
  }, []);

  return (
    <Formik<Values>
      initialValues={{ destinationWallet: "", amount: 0 }}
      validationSchema={issueTokenValidationSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          await handleIssueToken(values.destinationWallet as Address, values.amount);
          resetForm();
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form className="space-y-8">
          <Input label="Wallet Address" type="text" name="destinationWallet" id="destination" />
          <Input label="Amount of Asset" type="text" name="amount" id="amount" />
          <div
            className={classNames({
              "grid grid-cols-2 gap-2.5": Boolean(backButton),
            })}
          >
            {backButton}
            <button
              type="submit"
              aria-disabled={!isValid}
              disabled={isSubmitting}
              className="bg-t-purple text-white py-[18px] px-[70px] rounded w-full"
            >
              {submitButtonText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { IssueTokenForm };
