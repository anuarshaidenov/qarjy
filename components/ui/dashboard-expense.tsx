import React from "react";
import { NumericFormat } from "./numeric-format";
import { Button } from "./button";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { NumericFormatProps } from "react-number-format";
import { Input } from "./input";

type Props = {
  title: string;
  currencySymbol?: string;
  inputProps: NumericFormatProps;
  onDeleteClick: () => void;
  disabled?: boolean;
  textInputProps?: React.ComponentProps<"input">;
};

export const DashboardExpense = (props: Props) => {
  return (
    <li className="flex items-center py-1 justify-between w-full group">
      <Input
        className="md:w-[120px] w-[80px]"
        autoComplete="off"
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        {...props.textInputProps}
      />
      <div className="flex shrink grow-0 items-center  gap-2">
        <NumericFormat
          thousandSeparator=","
          className="md:w-[120px] w-[80px]"
          autoComplete="off"
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          {...props.inputProps}
        />
        <span className="md:flex hidden md:group-hover:hidden text-lg">
          {props.currencySymbol || "₸"}
        </span>
        <Button
          className="shrink-0 md:hidden group-hover:flex transition-opacity"
          variant={"destructive"}
          size={"icon"}
          onClick={props.onDeleteClick}
          disabled={props.disabled}
        >
          <CircleBackslashIcon />
        </Button>
      </div>
    </li>
  );
};
