import { ComponentProps, FC } from "react";
import { EmailSignInForm } from "./emailSignInForm";
import Link from "next/link";

type EmailSignInFormProps = ComponentProps<typeof EmailSignInForm>;

interface AuthPageProps {
  authAction: EmailSignInFormProps["authAction"];
  handleSignIn: EmailSignInFormProps["handleSignIn"];
}

const authActionPageCopy: {
  [key in EmailSignInFormProps["authAction"]]: {
    title: string;
    description: string;
  };
} = {
  login: {
    title: "Login",
    description:
      "Welcome back to TAAS. You know the drill; please input your email address in order to sign in.",
  },
  "sign-up": {
    title: "Sign Up",
    description:
      "Welcome to TAAS, the best tokenization platform on the streets. Please input your email address in order to sign up.",
  },
};

const AuthPage: FC<AuthPageProps> = ({ authAction, handleSignIn }) => {
  return (
    <section className="flex flex-col items-center gap-[54px]">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center w-fit text-t-black text-2xl font-medium">
          {authActionPageCopy[authAction].title}
        </h3>
        <p className="text-center max-w-[432px] mx-auto text-t-black/80">
          {authActionPageCopy[authAction].description}
        </p>
      </div>
      <EmailSignInForm authAction={authAction} handleSignIn={handleSignIn} />
      <div className="text-sm flex justify-end w-full">
        {authAction === "login" ? (
          <span className="text-t-black/70">
            No Account yet ?{" "}
            <Link className="text-t-purple underline" href="/signup">
              Sign Up
            </Link>
          </span>
        ) : (
          <span className="text-t-black/70">
            Have an Account ?{" "}
            <Link className="text-t-purple underline" href="/login">
              Login
            </Link>
          </span>
        )}
      </div>
    </section>
  );
};

export { AuthPage };
