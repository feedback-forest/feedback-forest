import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";

import Image from "next/image";

interface IconDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  renderItem: JSX.Element;
}

const IconDialog = ({
  dialogTitle,
  dialogDescription,
  renderItem,
}: IconDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded p-1">
          <Image src="/icons/share.svg" alt="share" width={27} height={24} />
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogContent>{renderItem}</DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default IconDialog;
