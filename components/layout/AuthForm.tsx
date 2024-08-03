"use client";

import { z } from "zod";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import AuthSocialButton from "./AuthSocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthFormSchema, AuthVariant } from "@/lib/schema/auth.schema";
import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<AuthVariant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

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
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const userData = {
      name: values.username!,
      email: values.email,
      password: values.password,
    };

    if (variant === "REGISTER") {
      axios
        .post("/api/register", userData)
        .then(() => {
          signIn("credentials", userData)
            .then((callback) => {
              if (callback?.error) {
                toast({
                  title: "Uh Oh! Something went wrong.",
                  description: callback.error,
                  variant: "destructive",
                });
              }

              if (callback?.ok && !callback?.error) {
                router.push("/users");
              }
            })
            .finally(() => setIsLoading(false));
        })
        .catch((err) => {
          toast({
            title: "Uh Oh! Something went wrong.",
            description: err.response.data,
            variant: "destructive",
          });
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...userData,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              title: "Uh Oh! Something went wrong.",
              description: callback.error,
              variant: "destructive",
            });
          }

          if (callback?.ok && !callback?.error) {
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsSocialLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: "Uh Oh! Something went wrong.",
            description: callback.error,
            variant: "destructive",
          });
        }

        if (callback?.ok && !callback?.error) {
          toast({
            title: "Success!",
            description: "You are now logged in.",
          });
        }
      })
      .finally(() => setIsSocialLoading(false));
  };

  return (
    <>
      <div className="mx-auto w-full max-w-md flex flex-col justify-center items-center gap-3">
        <div className="flex justify-center items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
          <h3 className="text-2xl tracking-wide lg:hidden">
            <span className="font-normal">nexu</span>
            <span className="font-bold">talk</span>
          </h3>
        </div>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900">
          {variant === "LOGIN"
            ? "Sign in to your account"
            : "Let's create an account"}
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white px-6 py-8 shadow rounded-xl sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {variant === "REGISTER" && (
                <AuthInput
                  control={form.control}
                  name="username"
                  type="text"
                  label="Full Name"
                  placeholder="John Doe"
                  disabled={isLoading || isSocialLoading}
                />
              )}
              <AuthInput
                control={form.control}
                name="email"
                type="email"
                label="Email address"
                placeholder="example@gmail.com"
                disabled={isLoading || isSocialLoading}
              />
              <AuthInput
                control={form.control}
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                disabled={isLoading || isSocialLoading}
              />
              <AuthButton
                type="submit"
                disabled={isLoading || isSocialLoading}
                fullWidth={true}
              >
                {" "}
                {isLoading ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    &nbsp;Loading
                  </>
                ) : (
                  <>{variant === "LOGIN" ? "Login" : "Register"}</>
                )}
              </AuthButton>
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
                disabled={isLoading || isSocialLoading}
                onClick={() => socialAction("google")}
              />
              <AuthSocialButton
                icon={FaGithub}
                text="GitHub"
                disabled={isLoading || isSocialLoading}
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
              className="underline cursor-pointer text-primary"
            >
              {variant === "LOGIN" ? "Register" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
