import { type NextPage } from "next";
import Head from "next/head";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { env } from "process";
import { api } from "~/utils/api";
import { useForm, type Resolver } from "react-hook-form";
import { useRouter } from "next/router";

type FormValues = {
  firstName: string;
  lastName?: string;
  username: string;
};

const resolver: Resolver<FormValues> = (values) => {
  return {
    values: values.firstName ? values : {},
    errors:
      !values.firstName || !values.username
        ? {
            firstName: {
              type: "required",
              message: "First name is required",
            },
            username: {
              type: "required",
              message: "Username is required",
            },
          }
        : {},
  };
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const {
    mutate,
    error: usernameUniqueError,
    isError: isUsernameUniqueError,
  } = api.profiles.postOne.useMutation();
  const user = useUser();
  const router = useRouter();

  const submitUsernameForm = handleSubmit((data) => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName || "",
      username: data.username,
    });
  });
  return (
    <>
      <Head>
        <title>Weekly Finance Tracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-[#6495ED] to-[#00008B] align-middle">
        <div className="flex flex-col items-start">
          <SignedOut>
            <div className="flex justify-around">
              <h1 className="absolute top-40 font-sans text-6xl text-white">
                Welcome!
              </h1>
              <SignUpButton redirectUrl={env.HOST_URL} mode="modal">
                <button className="mr-4 aspect-2/1 w-150 rounded-md border border-solid border-white bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black">
                  Sign Up
                </button>
              </SignUpButton>
              <SignInButton redirectUrl={env.HOST_URL} mode="modal">
                <button className="mr-4 aspect-2/1 w-150 rounded-md border border-solid border-white bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <span className="mb-10 text-3xl text-white">
              Hello,{" "}
              {user?.user?.firstName
                ? user.user.firstName
                : user?.user?.emailAddresses[0]?.emailAddress}
              !{" "}
            </span>
            <span className="mb-10 text-2xl text-white">
              You are signed in with{" "}
              {user?.user?.primaryEmailAddress?.verification.strategy ===
              "from_oauth_google"
                ? "Google"
                : "Email"}
            </span>

            <form
              id={"signup-username-form"}
              className="w-full"
              onSubmit={submitUsernameForm}
            >
              <div className="my-6 flex w-full flex-col justify-start">
                <label
                  htmlFor={"signup-username-field"}
                  className="my-3 text-lg text-white"
                >
                  Username
                </label>
                <input
                  className="focus:border-3 rounded-md border-2 border-solid border-white py-3 pl-2 outline-none transition-all duration-200 ease-in focus:border-purple-800 focus:shadow-md focus:shadow-purple-950"
                  placeholder="Something unique and personalised"
                  id="signup-username-field"
                  {...register("username")}
                />
                {errors?.username && (
                  <p className="mt-3 text-orange-300">
                    {errors.username.message}
                  </p>
                )}
                {isUsernameUniqueError && (
                  <p className="mt-3 text-orange-300">
                    {usernameUniqueError.message}
                  </p>
                )}
              </div>

              <div className="my-6 flex w-full flex-col justify-start">
                <label
                  htmlFor={"signup-firstname-field"}
                  className="my-3 text-lg text-white"
                >
                  First Name
                </label>
                <input
                  className="focus:border-3 rounded-md border-2 border-solid border-white py-3 pl-2 outline-none transition-all duration-200 ease-in focus:border-purple-800 focus:shadow-md focus:shadow-purple-950"
                  placeholder="John"
                  id="signup-firstname-field"
                  {...register("firstName")}
                />
                {errors?.firstName && (
                  <p className="mt-3 text-orange-300">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="my-6 flex w-full flex-col justify-start">
                <label
                  htmlFor={"signup-lastname-field"}
                  className="my-3 text-lg text-white"
                >
                  Last Name
                </label>
                <input
                  className="focus:border-3 rounded-md border-2 border-solid border-white py-3 pl-2 outline-none transition-all duration-200 ease-in focus:border-purple-800 focus:shadow-md focus:shadow-purple-950"
                  placeholder="Doe"
                  id="signup-lastname-field"
                  {...register("lastName")}
                />

                {/* {Add Currency} */}
              </div>

              <div className="flex w-full justify-between">
                <button
                  type="button"
                  className="aspect-2/1 w-150  rounded-md border border-solid bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black"
                >
                  Continue
                </button>

                <SignOutButton
                  signOutCallback={() => {
                    router.push("/sign-in");
                  }}
                >
                  <button
                    type="button"
                    className="aspect-2/1 w-150  rounded-md border border-solid bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black"
                  >
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </form>
          </SignedIn>
        </div>
      </main>
    </>
  );
};

export default Home;
