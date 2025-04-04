"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Pin } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

type Props = {};

export const TrustedBySection = (props: Props) => {
  const t = useTranslations("");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "end center"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5], [1000, 0]);

  return (
    <section
      ref={ref}
      className="py-12 pb-32 md:pb-64 md:py-32 overflow-hidden"
    >
      <div className="container flex items-center justify-center">
        <motion.div
          style={{ x }}
          className="bg-muted relative rounded-[3px] -rotate-6 font-mono py-24 px-12 text-center flex items-center justify-center"
        >
          <Pin className="absolute size-9 -top-[16px] left-1/2 -translate-x-1/2" />
          <p className="text-xl font-bold">{t("trusted-by-text")}</p>
        </motion.div>
      </div>
    </section>
  );
};
