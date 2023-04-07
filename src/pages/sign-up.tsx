import { SignUp } from "@clerk/nextjs";
import LoginCard from "~/components/LoginCard";

const Signup = () => {
  return (
    <div className="test-bg-size z-0 flex h-screen w-screen bg-[#B6DBF6] bg-signup-bg bg-no-repeat">
      <div className="h-full w-1/2"></div>
      <div
        className="flex h-full w-1/2 items-center justify-center opacity-80"
        style={{
          background:
            "linear-gradient(209.52deg, #6495ed 26.53%, #dfecf9 70.2%)",
        }}
      >
        <div className="h-4/5 w-2/4 rounded-2xl border bg-white">
          <LoginCard isSignIn={false} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
