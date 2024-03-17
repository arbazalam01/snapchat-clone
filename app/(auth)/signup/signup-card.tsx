"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authActionGithub, authActionGoogle } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function SignupCard() {
  const [errorMessage, dispatch] = useFormState(authActionGoogle, "");

  return (
    <>
      <form action={dispatch} className="space-y-4">
        {/* <SignUpButtonGithub /> */}
        <SignUpButtonGoogle />
      </form>

      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/login"
        >
          Log in
        </Link>
        {errorMessage ? (
          <p className="text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    </>
  );
}

function SignUpButtonGithub() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full flex gap-2"
      disabled={pending}
      aria-disabled={pending}
    >
      <Image src={"/github.svg"} width={20} height={20} alt="Github logo" />{" "}
      Sign up with Github
    </Button>
  );
}

function SignUpButtonGoogle() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full flex gap-2"
      disabled={pending}
      aria-disabled={pending}
    >
      <Image src={"/google.svg"} width={20} height={20} alt="Google logo" />{" "}
      Sign up with Google
    </Button>
  );
}
