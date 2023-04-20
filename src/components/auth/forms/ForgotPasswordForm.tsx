import { useSignIn } from "@clerk/nextjs";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
};

const ForgotPasswordForm: FunctionComponent = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive, setSession } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const forgotPasswordSubmit = handleSubmit(async (data) => {
    try {
      await signIn?.create({
        strategy: "email_link",
        identifier: data.email,
        redirectUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/reset-password`,
      });
      toast.success("Email has been sent!");
    } catch (err: any) {
      console.log(err.errors);
      if (err.errors[0].code === "session_exists") {
        toast.error("You are already logged in!");
        router.push(`${process.env.NEXT_PUBLIC_HOST_URL}`);
        return;
      }
      toast.error(
        "Could not send email. Please make sure the email address exists or try again later"
      );
    }
  });

  return (
    <form
      id="forgot-password-form"
      className="flex h-2/3 w-full flex-col"
      onSubmit={forgotPasswordSubmit}
    >
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

export default ForgotPasswordForm;
