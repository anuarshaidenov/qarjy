"use client";

import { ReactNode } from "react";
import {
  NumericFormatProps,
  NumericFormat as ReactNumberFormat,
} from "react-number-format";
import { Input } from "./input";

type Props = {
  customInputNode?: ReactNode;
};

export const NumericFormat = (props: NumericFormatProps & Props) => {
  return <ReactNumberFormat {...props} customInput={Input} />;
};
