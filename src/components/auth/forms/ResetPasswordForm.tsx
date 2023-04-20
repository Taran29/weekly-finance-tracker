import { useForm } from "react-hook-form";
import { type FunctionComponent } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {};

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm: FunctionComponent = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>();

  const { user } = useUser();

  const resetPasswordSubmit = handleSubmit(async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Password and Confirm Password should match",
      });
      return;
    }

    clearErrors("confirmPassword");

    try {
      await user?.update({
        password: data.newPassword,
      });

      toast.success("Password has been reset successfully!");
      router.push(`${process.env.NEXT_PUBLIC_HOST_URL}`);
    } catch (err: any) {
      console.log(err.errors);
      if (err.errors[0].code === "form_password_pwned") {
        toast.error("Please choose a more secure password");
      }
    }
  });

  return (
    <form
      id="reset-password-form"
      className="flex h-2/3 w-full flex-col"
      onSubmit={resetPasswordSubmit}
    >
      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">New Password</label>
        <input
          className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
          type="password"
          placeholder="New Password"
          {...register("newPassword", {
            required: {
              value: true,
              message: "New Password is required",
            },
            minLength: {
              value: 8,
              message: "Password should at least have 8 characters",
            },
            maxLength: {
              value: 50,
              message: "Password cannot have more than 50 characters",
            },
          })}
        />
        {errors?.newPassword && (
          <p className="mt-3 text-orange-300">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="my-3 flex flex-col">
        <label className="mb-2 font-semibold">Confirm Password</label>
        <input
          className="linear rounded-md border-2 border-gray-700 px-3 py-3 outline-none transition-all duration-200 focus:border-2 focus:border-solid focus:border-[#EBC05D]"
          type="password"
          placeholder="Confirm New Password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
        />
        {errors?.confirmPassword && (
          <p className="mt-3 text-orange-300">
            {errors.confirmPassword.message}
          </p>
        )}
        {}
      </div>

      <button
        className="linear mt-auto w-3/5 self-center rounded-xl bg-[#EBC05D] px-5 py-5 text-xl transition-all duration-300 hover:bg-black hover:text-white"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
};

export default ResetPasswordForm;
