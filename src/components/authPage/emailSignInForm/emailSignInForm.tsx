import { Input } from '@/components/formPrimitives/input';
import { FormSubmitSpinner } from '@/components/loaders';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

type AuthAction = 'sign-up' | 'login';

interface EmailSignInFormProps {
  handleSignIn: (email: string) => Promise<void>;
  authAction: AuthAction;
}

const emailSignInSchema = Yup.object({
  email: Yup.string().required().email(),
});

type Values = Yup.InferType<typeof emailSignInSchema>;

const toastMessages: {
  [key in AuthAction]: {
    success: string;
    error: string;
  };
} = {
  'sign-up': {
    success: 'Welcome',
    error: 'Creating an account failed, please try again',
  },
  login: {
    success: 'Logged In',
    error: 'Login failed',
  },
};

const EmailSignInForm: FC<EmailSignInFormProps> = ({ handleSignIn, authAction }) => {
  return (
    <Formik<Values>
      initialValues={{
        email: '',
      }}
      validationSchema={emailSignInSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await handleSignIn(values.email);

          toast.success(toastMessages[authAction].success);
        } catch (error) {
          toast.success(toastMessages[authAction].error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-10 max-w-[431px] w-full mx-auto">
          <Input label="Email Address" name="email" id="email" placeholder="john@email.com" />
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-t-purple py-[17px] rounded flex items-center justify-center px-[57px] disabled:opacity-60 text-white"
          >
            {isSubmitting ? (
              <>
                <FormSubmitSpinner />
                <span className="ml-2">Authenticating</span>
              </>
            ) : (
              'Request for OTP'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export { EmailSignInForm };
