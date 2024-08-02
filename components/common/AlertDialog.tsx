"use client";

import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AlertDialog = ({ isOpen, onClose, children }: AlertDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-0 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <DialogPanel className="relative w-full max-w-md sm:max-w-lg transform overflow-hidden rounded-xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute top-0 right-0 pt-4 pr-4 hidden sm:block z-10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertDialog;
