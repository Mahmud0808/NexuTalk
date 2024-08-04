"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "../ui/use-toast";
import AlertDialog from "./AlertDialog";
import { FiAlertTriangle } from "react-icons/fi";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { HiTrash } from "react-icons/hi2";
import { Loader2 } from "lucide-react";
import AuthButton from "./AuthButton";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  conversationId,
}: ConfirmDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
      })
      .catch((err) => {
        toast({
          title: "Uh Oh! Something went wrong.",
          description: err.response.data,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <div className="flex items-start">
        <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 justify-center items-center rounded-full bg-red-100 dark:bg-red-200">
          <FiAlertTriangle className="size-5 sm:size-6 text-red-500" />
        </div>
        <div className="ml-4 mt-2 sm:mt-3 text-left">
          <DialogTitle>
            <h3 className="text-base font-semibold leading-6 text-text">
              Delete Conversation
            </h3>
          </DialogTitle>
          <div className="mt-1 sm:mt-2">
            <p className="text-sm text-text-secondary">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-2">
        <AuthButton
          type="button"
          disabled={isLoading}
          onClick={onDelete}
          danger
        >
          {isLoading ? (
            <Loader2 className="size-[18px] animate-spin mr-2" />
          ) : (
            <HiTrash size={18} className="mr-2" />
          )}
          Delete
        </AuthButton>
        <AuthButton
          type="button"
          disabled={isLoading}
          onClick={onClose}
          secondary
        >
          Cancel
        </AuthButton>
      </div>
    </AlertDialog>
  );
};

export default ConfirmDialog;
