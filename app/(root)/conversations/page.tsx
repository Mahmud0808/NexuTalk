"use client";

import EmptyState from "@/components/common/EmptyState";
import useConversation from "@/lib/hooks/useConversation.hooks";
import clsx from "clsx";
import React from "react";

const page = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("h-full w-full lg:pl-80 lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default page;
