"use client";

import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import React, { createContext, useContext, useState } from "react";

type ScrollOpacityContextType = {
  opacity: MotionValue<number>;
  setOpacity: React.Dispatch<React.SetStateAction<MotionValue<number>>>;
};

type ScrollYProgressContextType = {
  scrollYProgress: MotionValue<number>;
  setScrollYProgress: React.Dispatch<React.SetStateAction<MotionValue<number>>>;
};

const ScrollOpacityContext = createContext<ScrollOpacityContextType>({
  opacity: new MotionValue(),
  setOpacity: () => {},
});

const ScrollYProgressContext = createContext<ScrollYProgressContextType>({
  scrollYProgress: new MotionValue(),
  setScrollYProgress: () => {},
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

export const useScrollYProgress = () => {
  const context = useContext(ScrollYProgressContext);

  if (!context) {
    throw new Error(
      "useScrollYProgress must be used within a ScrollYProgressProvider"
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

export const ScrollYProgressProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [scrollYProgress, setScrollYProgress] = useState(new MotionValue());
  return (
    <ScrollYProgressContext.Provider
      value={{ scrollYProgress, setScrollYProgress }}
    >
      {children}
    </ScrollYProgressContext.Provider>
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
  const { setScrollYProgress } = useScrollYProgress();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setOpacity(opacity);
    setScrollYProgress(scrollYProgress);
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
