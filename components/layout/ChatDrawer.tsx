"use client";

import { Conversation, User } from "@prisma/client";
import { Fragment, useState } from "react";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import ConfirmDialog from "../common/ConfirmDialog";
import ChatDrawerBody from "./ChatDrawerBody";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  otherUsers: User[];
  data: Conversation & {
    users: User[];
  };
}

const ChatDrawer = ({
  isOpen,
  onClose,
  otherUsers,
  data: conversation,
}: ChatDrawerProps) => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <ConfirmDialog
        isOpen={isModalOpen}
        onClose={() => setModalIsOpen(false)}
        conversationId={conversation.id}
      />
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="h-full bg-white py-6 shadow-xl">
                    <ChatDrawerBody
                      data={conversation}
                      otherUsers={otherUsers}
                      onClose={onClose}
                      onDelete={() => setModalIsOpen(true)}
                    />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChatDrawer;
