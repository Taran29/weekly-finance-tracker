import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import styles from "./index.module.css";

import { api } from "~/utils/api";
import { env } from "process";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const user = useUser();
  return (
    <>
      <Head>
        <title>Sign Up - Weekly Finance Tracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex flex-col items-start">
          {!user.isSignedIn && (
            <div className="flex justify-around">
              <SignUpButton redirectUrl={env.HOST_URL} mode="modal">
                <button className="mr-4 aspect-1/0.5 w-150 rounded-md border border-solid border-white bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black">
                  Sign Up
                </button>
              </SignUpButton>
              <SignInButton redirectUrl={env.HOST_URL} mode="modal">
                <button className="ml-4 aspect-1/0.5 w-150 rounded-md border border-solid border-white bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
          {!!user.isSignedIn && (
            <>
              <span className="mb-10 text-3xl text-white">
                Hello,{" "}
                {user.user.firstName
                  ? user.user.firstName
                  : user.user.emailAddresses[0]?.emailAddress}
                !{" "}
              </span>
              <span className="mb-10 text-2xl text-white">
                You are signed in with Google
              </span>
              <SignOutButton>
                <button className="aspect-1/0.5 w-150  rounded-md border border-solid bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black">
                  Sign Out
                </button>
              </SignOutButton>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
