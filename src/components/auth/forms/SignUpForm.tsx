import Link from "next/link";
import type { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

type FormValues = {
  username?: string;
  email: string;
  password: string;
};

const SignUpForm: FunctionComponent = () => {
  const router = useRouter();
  const { signUp, setActive } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const signUpSubmit = void handleSubmit(async (data) => {
    try {
      const signedUpUser = await signUp?.create({
        emailAddress: data.email,
        password: data.password,
        username: data.username,
      });

      if (signedUpUser?.status === "complete") {
        if (setActive) {
          await setActive({ session: signedUpUser.createdSessionId });
          if (process.env && process.env.NEXT_PUBLIC_HOST_URL !== undefined) {
            await router.push(`${process.env.NEXT_PUBLIC_HOST_URL}`);
          }
        }
      } else {
        console.log(signedUpUser);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && err !== null && "errors" in err) {
        const errors = err.errors as ClerkAPIError[];
        console.log(errors);
        if (errors[0] !== undefined && errors[0].code === "session_exists") {
          console.log(errors);
          toast.error(errors[0].message);
        }
      }
    }
  });

  return (
    <form
      id="signup-form"
      className="flex h-2/3 w-full flex-col"
      onSubmit={signUpSubmit}
    >
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Username</label>
        <input
          className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
          type="text"
          placeholder="Username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
            minLength: {
              value: 2,
              message: "Username should at least have 2 characters",
            },
            maxLength: {
              value: 30,
              message: "Username cannot have more than 30 characters",
            },
          })}
        />
        {errors?.username && (
          <p className="mt-3 text-orange-300">{errors.username.message}</p>
        )}
      </div>

      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Email</label>
        <input
          className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            maxLength: {
              value: 70,
              message: "Email cannot be more than 70 characters",
            },
            pattern: {
              value: new RegExp(
                "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
              ),
              message: "Email should be valid",
            },
          })}
        />
        {errors?.email && (
          <p className="mt-3 text-orange-400">{errors.email.message}</p>
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

      <button
        className="linear mt-auto w-3/5 self-center rounded-xl bg-[#EBC05D] px-5 py-5 text-xl transition-all duration-300 hover:bg-black hover:text-white"
        type="submit"
      >
        Continue
      </button>

      <div className="mt-5 flex items-center justify-center pb-5">
        <span>Have an account?&nbsp;</span>
        <Link className="text-[#ED9352] hover:underline" href={"/sign-in"}>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
