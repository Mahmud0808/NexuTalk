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
  FormMessage,
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
    <div className="bg-white w-full p-4 border-t flex items-center gap-2 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handleUpload}
        /* Cloudinary > Settings > Upload presets > Copy name (must be unsigned) */
        uploadPreset="NexuTalk"
      >
        <HiPhoto
          size={30}
          className="text-primary hover:text-primary-dark transition cursor-pointer"
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
                      className="text-black font-light p2 h-auto bg-neutral-100 w-full rounded-full focus-visible:ring-white"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark px-4 py-2 h-auto rounded-full transition"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInputBox;
