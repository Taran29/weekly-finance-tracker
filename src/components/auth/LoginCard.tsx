import type { FunctionComponent } from "react";
import Image from "next/image";
import {
  ForgotPasswordForm,
  ResetPasswordForm,
  SignInForm,
  SignUpForm,
} from "../../components";

type Props = {
  isSignIn?: boolean;
  isSignUp?: boolean;
  isForgotPassword?: boolean;
  isResetPassword?: boolean;
};

const LoginCard: FunctionComponent<Props> = ({
  isSignIn,
  isForgotPassword,
  isResetPassword,
  isSignUp,
}) => {
  return (
    <>
      <div className="rounded-2xl` h-full w-full p-10 shadow-2xl shadow-black">
        <div className="h-1/3 w-full">
          <div className="w-full text-center text-xl text-black">
            <h3 className="font-semibold uppercase">
              {isSignIn ? "Welcome Back!" : "Create your account"}
            </h3>
          </div>
          <div className="mt-1 w-full text-center text-lg text-gray-800">
            <span>{!isSignIn && "to "}continue to weekly finance tracker</span>
          </div>

          <div className="my-10 w-full">
            <div className="duration-250 flex items-center rounded-md border border-solid border-gray-300 px-2 py-3 text-lg transition-all ease-out hover:bg-gray-100">
              <Image
                src="/google.png"
                alt="Google"
                width={18}
                height={18}
                className="mx-4 inline-block"
              />
              <span className="text-sm">Continue with Google</span>
            </div>
          </div>

          <div className="w-full">
            <div className="inline-block w-2/5 align-middle">
              <hr className="border border-gray-300" />
            </div>
            <div className="inline-block w-1/5 text-center align-middle">
              or
            </div>
            <div className="inline-block w-2/5 align-middle">
              <hr className="border border-gray-300" />
            </div>
          </div>
        </div>

        {isResetPassword && <ResetPasswordForm />}
        {isSignUp && <SignUpForm />}
        {isSignIn && <SignInForm />}
        {isForgotPassword && <ForgotPasswordForm />}
      </div>
    </>
  );
};

export default LoginCard;
