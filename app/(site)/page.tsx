import Image from "next/image";
import { AuthForm } from "./component/AuthForm";

export default function Home() {
  return (
    <div className="z-50 relative flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image alt="Logo" height="48" width="48" className="mx-auto w-auto rounded-full" src="/images/logo.jpeg"/>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900/75">Sign in to Your Account</h2>
      </div>
      <AuthForm />
    </div>
  );
}
