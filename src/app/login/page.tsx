'use client';
import { GoogleLoginButton } from "@/components/GoogleLoginButton"
export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>

        <GoogleLoginButton />
      </div>
    </div>
  )
}