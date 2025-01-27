"use client";

import { useState } from "react";
import { Input } from "./input";
import { evaluate } from "mathjs";

export const CalculatorInput = (props: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) => {
  const [inputValue, setInputValue] = useState(props.value || "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (props.onChange) props.onChange(newValue);
  };

  const handleBlur = () => {
    try {
      const result = evaluate(inputValue);
      setInputValue(result.toString());
      if (props.onChange) props.onChange(result.toString());
    } catch {
      setInputValue("Invalid expression");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      className="md:text-lg font-semibold"
      id="monthly-income"
    />
  );
};
