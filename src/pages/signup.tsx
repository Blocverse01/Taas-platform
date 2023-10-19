import { AuthPage } from "@/components/authPage";
import type { NextPageWithLayout } from "./_app";
import SubPageLayout from "@/components/layout/subPageLayout";
import { signInWithEmail } from "@/utils/auth";

const SignUp: NextPageWithLayout = () => {
  return <AuthPage authAction="sign-up" handleSignIn={signInWithEmail} />;
};

SignUp.getLayout = (page) => <SubPageLayout>{page}</SubPageLayout>;

export default SignUp;
