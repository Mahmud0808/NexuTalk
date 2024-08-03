"use client";

import { GroupChatFormSchema } from "@/lib/schema/groupchat.schema";
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
import UserSelection from "../common/UserSelection";
import AuthButton from "../common/AuthButton";

interface NewGroupChatDialogProps {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

const NewGroupChatDialog = ({
  users,
  isOpen,
  onClose,
}: NewGroupChatDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = GroupChatFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const userData = {
      name: values.name,
      members: values.members,
    };

    axios
      .post("/api/conversations", {
        ...userData,
        isGroup: true,
      })
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
          <div className="border-b border-slate-200/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a group chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Group name"
                        autoComplete="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <UserSelection
                label="Members"
                disabled={isLoading}
                value={form.watch("members")}
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value: any) => {
                  form.setValue("members", value, {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-3">
            <AuthButton
              secondary
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </AuthButton>
            <AuthButton type="submit" disabled={isLoading}>
              Create
            </AuthButton>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default NewGroupChatDialog;
