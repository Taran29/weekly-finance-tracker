import { SignIn } from "@clerk/nextjs";
import LoginCard from "~/components/auth/LoginCard";

const Login = () => {
  return (
    <div className="test-bg-size z-0 flex h-screen w-screen bg-[#B6DBF6] bg-signup-bg bg-no-repeat">
      <div className="h-full w-1/2"></div>
      <div
        className="flex h-full w-1/2 items-center justify-center"
        style={{
          background:
            "linear-gradient(209.52deg, rgba(39, 113, 193, 0.8) 26.53%, rgba(223, 236, 249, 0.8) 70.2%)",
        }}
      >
        <div className="h-4/5 w-1/2 max-w-6xl rounded-2xl border bg-white">
          <LoginCard isResetPassword={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
