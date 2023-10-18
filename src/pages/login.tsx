import { AuthPage } from "@/components/authPage";
import type { NextPageWithLayout } from "./_app";
import SubPageLayout from "@/components/layout/subPageLayout";
import { signInWithEmail } from "@/utils/auth";

const Login: NextPageWithLayout = () => {
  return <AuthPage authAction="login" handleSignIn={signInWithEmail} />;
};

Login.getLayout = (page) => <SubPageLayout>{page}</SubPageLayout>;

export default Login;
