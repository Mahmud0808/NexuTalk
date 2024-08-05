"use client";

import { SettingsFormSchema } from "@/lib/schema/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import AlertDialog from "../common/AlertDialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import UserAvatar from "../common/UserAvatar";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import AuthButton from "../common/AuthButton";
import { signOut } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitch";

interface SettingsDialogProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({
  currentUser,
  isOpen,
  onClose,
}: SettingsDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = SettingsFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser?.name || "",
      image: currentUser?.image || "",
    },
  });

  const handleUpload = (result: any) => {
    form.setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const userData = {
      name: values.username,
      image: values.image,
    };

    axios
      .post("/api/settings", userData)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Uh Oh! Something went wrong.",
          description: err.response.data,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-text">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-text-secondary-dark">
              Edit your public information
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <div>
                <label className="block text-sm font-medium leading-6 text-text">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="relative inline-block h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      fill
                      src={
                        form.watch("image") ||
                        currentUser?.image ||
                        "/images/placeholder_profile_picture.png"
                      }
                      alt="Avatar"
                    />
                  </div>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="NexuTalk"
                  >
                    <AuthButton secondary type="button" disabled={isLoading}>
                      Change
                    </AuthButton>
                  </CldUploadButton>
                </div>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-text">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        defaultValue={currentUser?.name || ""}
                        placeholder={currentUser?.name || ""}
                        autoComplete="off"
                        disabled={isLoading}
                        className="!bg-bg-input"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <div className="block text-sm font-medium leading-6 text-text">
                  Theme
                </div>
                <ThemeSwitch showText />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end max-sm:justify-between gap-x-3">
            <div className="inline-block sm:hidden">
              <AuthButton
                secondary
                type="button"
                onClick={signOut}
                disabled={isLoading}
              >
                Log out
              </AuthButton>
            </div>
            <div className="inline-block max-sm:hidden">
              <AuthButton
                secondary
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </AuthButton>
            </div>
            <AuthButton type="submit" disabled={isLoading}>
              Save
            </AuthButton>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default SettingsDialog;
