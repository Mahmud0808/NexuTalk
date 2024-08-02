"use client";

import { Conversation, User } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import UserAvatar from "../common/UserAvatar";
import ConfirmDialog from "../common/ConfirmDialog";

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

  const joinedDate = useMemo(() => {
    return format(new Date(otherUsers[0].createdAt), "PP");
  }, [otherUsers[0].createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUsers[0].name;
  }, [conversation.name, otherUsers[0].name]);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ConfirmDialog
        isOpen={isModalOpen}
        onClose={() => setModalIsOpen(false)}
        conversationId={conversation.id}
      >
        <div className="bg-white p-5">
          <p>Are you sure you want to delete this conversation?</p>
        </div>
      </ConfirmDialog>
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <UserAvatar user={otherUsers[0]} size="lg" />
                        </div>
                        <DialogTitle>
                          <div className="font-semibold">{title}</div>
                        </DialogTitle>
                        <div className="text-sm text-gray-500">
                          {statusText}
                        </div>
                        <div className="flex gap-10 my-8">
                          <div
                            onClick={() => setModalIsOpen(true)}
                            className="flex flex-col gap-2 items-center cursor-pointer group"
                          >
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition">
                              <IoTrash size={20} />
                            </div>
                            <div className="text-sm font-light text-neutral-600 group-hover:text-neutral-800 transition">
                              Delete
                            </div>
                          </div>
                        </div>
                        <div className="w-full py-5 sm:px-0">
                          <dl className="px-4 sm:px-6 space-y-8 sm:space-y-6">
                            {!conversation.isGroup && (
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {otherUsers[0].email}
                                </dd>
                              </div>
                            )}
                            {!conversation.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Joined
                                  </dt>
                                  <time
                                    dateTime={joinedDate}
                                    className="mt-1 text-sm text-gray-900 sm:col-span-2"
                                  >
                                    {joinedDate}
                                  </time>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
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
