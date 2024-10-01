import { Input } from "..";
import { twMerge } from "tailwind-merge";

interface InputLabelProps {
  labelContent: string;
  placeholder: string;
  disabled?: boolean;
  status?: InputLabelStatus;
  type?: string;
  message?: string;
}

type InputLabelStatus = "default" | "correct" | "error";

const InputLabel = ({
  labelContent,
  placeholder,
  disabled,
  status = "default",
  type = "text",
  message,
}: InputLabelProps) => {
  const containerClassName = () => {
    if (message) {
      return "flex flex-col w-full gap-2";
    }
    return "flex flex-col w-full";
  };

  const borderColor = () => {
    if (disabled) {
      return "border-custom-disabled";
    }
    if (status === "error") {
      return "border-custom-error";
    }
    if (status === "correct") {
      return "border-custom-correct";
    }
    return "border-custom-purple";
  };

  const textColor = () => {
    if (disabled) {
      return "text-custom-textDescriptionGrayColor";
    }
  };

  const messageTextColor = () => {
    {
      if (status === "error") {
        return "text-custom-error";
      }
      if (status === "correct") {
        return "text-custom-correct";
      }
    }
  };

  return (
    <div className={containerClassName()}>
      <div className="flex flex-col w-full">
        <div className="text-base h-[21px] text-custom-textSemiBoldBlackColor">
          {labelContent}
        </div>
        <div className={twMerge(`flex w-full border-b-2`, borderColor())}>
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              "text-xl h-14 border-none shadow-none focus-visible:ring-0",
              textColor(),
            )}
          />
        </div>
      </div>
      <div className={twMerge("flex w-full text-base", messageTextColor())}>
        {message}
      </div>
    </div>
  );
};

export default InputLabel;
