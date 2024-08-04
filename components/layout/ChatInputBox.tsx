"use client";

import { z } from "zod";
import useConversation from "@/lib/hooks/useConversation.hooks";
import { ChatFormSchema } from "@/lib/schema/chat.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../ui/form";
import { Input } from "../ui/input";
import { CldUploadButton } from "next-cloudinary";

const ChatInputBox = () => {
  const { conversationId } = useConversation();

  const formSchema = ChatFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.reset();

    const messageData = {
      message: values.message,
    };

    axios.post("/api/messages", {
      ...messageData,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className="bg-bg w-full p-4 border-t-[1px] border-border flex items-center gap-2 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handleUpload}
        /* Cloudinary > Settings > Upload presets > Copy name (must be unsigned) */
        uploadPreset="NexuTalk"
      >
        <HiPhoto
          size={30}
          className="text-accent hover:text-accent-dark transition cursor-pointer"
        />
      </CldUploadButton>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex items-center gap-2 lg:gap-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <div className="relative w-full">
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Aa"
                      autoComplete="off"
                      {...field}
                      className="text-text font-light dark:font-normal caret-accent p2 h-auto !bg-bg-input w-full rounded-full focus-visible:ring-bg dark:focus-visible:ring-bg outline-none shadow-none"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent-dark px-4 py-2 h-auto rounded-full transition"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInputBox;
