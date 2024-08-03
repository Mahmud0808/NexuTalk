"use client";

import Image from "next/image";
import AlertDialog from "../common/AlertDialog";

interface ImageAlertDialogProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageAlertDialog = ({ src, isOpen, onClose }: ImageAlertDialogProps) => {
  if (!src) {
    return null;
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-h-96 flex items-center justify-center">
        <Image
          src={src}
          alt="Image"
          width="0"
          height="0"
          sizes="100vw"
          className="h-auto max-h-96 w-auto max-w-96"
        />
      </div>
    </AlertDialog>
  );
};

export default ImageAlertDialog;
