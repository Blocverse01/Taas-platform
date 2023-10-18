import { AuthPage } from "@/components/authPage";
import type { NextPageWithLayout } from "./_app";
import SubPageLayout from "@/components/layout/subPageLayout";

const Login: NextPageWithLayout = () => {
  return <AuthPage authAction="login" handleSignIn={async (email) => {}} />;
};

Login.getLayout = (page) => <SubPageLayout>{page}</SubPageLayout>;

export default Login;
