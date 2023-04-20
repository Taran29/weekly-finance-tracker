import type { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

const SignInForm: FunctionComponent = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const signInSubmit = void handleSubmit(async (data) => {
    try {
      const signedInUser = await signIn?.create({
        identifier: data.email,
        password: data.password,
      });

      if (signedInUser?.status === "complete") {
        if (setActive) {
          await setActive({ session: signedInUser.createdSessionId });
          if (process.env && process.env.NEXT_PUBLIC_HOST_URL !== undefined) {
            await router.push(`${process.env.NEXT_PUBLIC_HOST_URL}`);
          }
        }
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && err !== null && "errors" in err) {
        const errors = err.errors as ClerkAPIError[];
        console.log(errors);
        if (
          errors[0] !== undefined &&
          errors[0].code === "form_password_incorrect"
        ) {
          toast.error(errors[0].message);
        }
      }
    }
  });

  return (
    <form
      id="sign-in-form"
      className="flex h-2/3 w-full flex-col"
      onSubmit={signInSubmit}
    >
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Username or Email</label>
        <input
          className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
          type="text"
          placeholder="Username / Email"
          {...register("email", {
            required: {
              value: true,
              message: "Username or Email is required",
            },
          })}
        />
        {errors?.email && (
          <p className="mt-3 text-orange-300">{errors.email?.message}</p>
        )}
      </div>

      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Password</label>
        <input
          className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors?.password && (
          <p className="mt-3 text-orange-300">{errors.password.message}</p>
        )}
      </div>

      <div className="my-1 self-end">
        <Link
          href="/forgot-password"
          className="text-[#ED9352] hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        className="linear mt-auto w-3/5 self-center rounded-xl bg-[#EBC05D] px-5 py-5 text-xl transition-all duration-300 hover:bg-black hover:text-white"
        type="submit"
      >
        Continue
      </button>

      <div className="mt-5 flex items-center justify-center pb-5">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link className="text-[#ED9352] hover:underline" href={"/sign-up"}>
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
