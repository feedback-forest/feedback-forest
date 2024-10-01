import { Input } from "..";

interface InputLabelProps {
  labelContent: string;
  placeholder: string;
  borderColor?: string;
  disabled?: boolean;
  width?: `${number}px`;
  height?: `${number}px`;
  type?: string;
  inputClassName?: string;
  renderItem?: JSX.Element;
}

const InputLabel = ({
  labelContent,
  borderColor,
  width,
  height,
  placeholder,
  disabled,
  type = "text",
  inputClassName = "text-xl border-none shadow-none h-14 focus-visible:ring-0",
  renderItem,
}: InputLabelProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="text-base h-[21px] text-[#404040]">{labelContent}</div>
      <div className="flex flex-row w-full gap-4">
        <div className={`flex w-full border-b-2 border-[${borderColor}]`}>
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
          />
        </div>
        {renderItem}
      </div>
    </div>
  );
};

export default InputLabel;
