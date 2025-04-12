'use client';
import { GoogleLoginButton } from "@/components/GoogleLoginButton"
import { SignInForm } from "@/components/SignInForm";
import { Separator } from "@/components/ui/separator";
export default function Login() {
  return (
    <div className="mt-20 flex justify-center h-screen">
      <div className="w-[500px] flex-col items-center">
        <h1 className="mb-5 w-full text-center">Welcome back</h1>
        <div className="mt-10"></div>
        <GoogleLoginButton />
        <div className="mt-10"></div>
        <Separator />
        <div className="mt-10"></div>
        <SignInForm />
      </div>
    </div>
  )
}