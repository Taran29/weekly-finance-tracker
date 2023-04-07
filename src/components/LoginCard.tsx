import type { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isSignIn: boolean;
};

const LoginCard: FunctionComponent<Props> = ({ isSignIn }) => {
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

        <form className="flex h-2/3 w-full flex-col">
          {!isSignIn && (
            <>
              <div className="my-3 flex flex-col">
                <label className="mb-2 font-semibold">Username</label>
                <input
                  className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div className="my-3 flex flex-col">
                <label className="mb-2 font-semibold">Email</label>
                <input
                  className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </>
          )}

          {isSignIn && (
            <>
              <div className="my-3 flex flex-col">
                <label className="mb-2 font-semibold">Username or Email</label>
                <input
                  className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
                  type="text"
                  placeholder="Username / Email"
                />
              </div>
            </>
          )}

          <div className="my-3 flex flex-col">
            <label className="mb-2 font-semibold">Password</label>
            <input
              className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
              type="password"
              placeholder="Password"
            />
          </div>

          {isSignIn && (
            <>
              <div className="my-1 self-end">
                <Link href="/sign-up" className="text-[#ED9352]">
                  Forgot Password?
                </Link>
              </div>
            </>
          )}

          <button
            className="linear mt-auto w-3/5 self-center rounded-xl bg-[#EBC05D] px-5 py-5 text-xl transition-all duration-300 hover:bg-black hover:text-white"
            type="submit"
          >
            Continue
          </button>

          <div className="mt-5 flex items-center justify-center">
            {isSignIn && (
              <>
                <span>Don&apos;t have an account?&nbsp;</span>
                <Link className="text-[#ED9352]" href={"/sign-up"}>
                  Sign Up
                </Link>
              </>
            )}

            {!isSignIn && (
              <>
                <span>Have an account?&nbsp;</span>
                <Link className="text-[#ED9352]" href={"/sign-in"}>
                  Log in
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginCard;
