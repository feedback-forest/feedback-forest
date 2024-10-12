"use client";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@/shared/ui";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserServiceAgreeDialogProps {
  setAgree: Dispatch<SetStateAction<boolean>>;
}

type UserServiceAgreeForm = {
  serviceAgree: boolean;
  personalInformationAgree: boolean;
  locationBasedServiceAgree: boolean;
  marketingAgree?: boolean;
};

const UserServiceAgreeDialog = ({ setAgree }: UserServiceAgreeDialogProps) => {
  const [openUserAgreeDialog, setOpenUserAgreeDialog] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserServiceAgreeForm>();

  const agreeAndStartService: SubmitHandler<UserServiceAgreeForm> = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div></div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>서비스를 시작하기 위해 동의가 필요해요</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(agreeAndStartService)}>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </Label>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserServiceAgreeDialog;
