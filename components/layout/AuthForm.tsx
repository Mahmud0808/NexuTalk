"use client";

import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { AuthFormSchema, AuthVariant } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import AuthSocialButton from "./AuthSocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const AuthForm = () => {
  const [variant, setVariant] = useState<AuthVariant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const formSchema = AuthFormSchema(variant);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const userData = {
      userName: values.userName!,
      email: values.email,
      password: values.password,
    };

    try {
      if (variant === "REGISTER") {
        // sign-up
      }

      if (variant === "LOGIN") {
        // login
      }
    } catch (err: any) {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: err.message,
        variant: "destructive",
        className: "bg-white",
      });

      setIsLoading(false);
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // social sign-in buttons
  };

  return (
    <div className="mt-8 mx-auto w-full max-w-md">
      <div className="bg-white px-4 py-8 shadow rounded-lg md:rounded-xl sm:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {variant === "REGISTER" && (
              <CustomInput
                control={form.control}
                name="userName"
                type="text"
                label="Full Name"
                disabled={isLoading}
              />
            )}
            <CustomInput
              control={form.control}
              name="email"
              type="email"
              label="Email"
              disabled={isLoading}
            />
            <CustomInput
              control={form.control}
              name="password"
              type="password"
              label="Password"
              disabled={isLoading}
            />
            <CustomButton type="submit" disabled={isLoading} fullWidth={true}>
              {" "}
              {isLoading ? (
                <>
                  Please wait &nbsp; <Loader2 className="size-5 animate-spin" />
                </>
              ) : (
                <>{variant === "LOGIN" ? "Login" : "Register"}</>
              )}
            </CustomButton>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={FcGoogle}
              text="Google"
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              icon={FaGithub}
              text="GitHub"
              onClick={() => socialAction("github")}
            />
          </div>
        </div>
        <div className="flex justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}
          </div>
          &nbsp;
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer text-sky-500"
          >
            {variant === "LOGIN" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
