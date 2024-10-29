"use client";

import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import React, { createContext, useContext, useState } from "react";

type ScrollOpacityContextType = {
  opacity: MotionValue<number>;
  setOpacity: React.Dispatch<React.SetStateAction<MotionValue<number>>>;
};

const ScrollOpacityContext = createContext<ScrollOpacityContextType>({
  opacity: new MotionValue(),
  setOpacity: () => {},
});

export const useScrollOpacity = () => {
  const context = useContext(ScrollOpacityContext);

  if (!context) {
    throw new Error(
      "useScrollOpacity must be used within a ScrollOpacityProvider"
    );
  }
  return context;
};

export const ScrollOpacityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [opacity, setOpacity] = useState(new MotionValue());
  return (
    <ScrollOpacityContext.Provider value={{ opacity, setOpacity }}>
      {children}
    </ScrollOpacityContext.Provider>
  );
};

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ScrollWrapper = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { setOpacity } = useScrollOpacity();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setOpacity(opacity);
  });

  return (
    <motion.div ref={ref} className={props.className}>
      {props.children}
    </motion.div>
  );
};

export const OpacityWrapper = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { opacity } = useScrollOpacity();

  return (
    <motion.div className={props.className} style={{ opacity }}>
      {props.children}
    </motion.div>
  );
};
