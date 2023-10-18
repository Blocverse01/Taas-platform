import { AuthPage } from "@/components/authPage";
import type { NextPageWithLayout } from "./_app";
import SubPageLayout from "@/components/layout/subPageLayout";

const SignUp: NextPageWithLayout = () => {
  return <AuthPage authAction="sign-up" handleSignIn={async (email) => {}} />;
};

SignUp.getLayout = (page) => <SubPageLayout>{page}</SubPageLayout>;

export default SignUp;
