"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";

const LoadingDialog = () => {
  return (
    <Transition show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900/50 bg-opacity-50 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="text-accent">
              <Loader2 className="mx-auto h-8 w-8 md:h-12 md:w-12 animate-spin" />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoadingDialog;
