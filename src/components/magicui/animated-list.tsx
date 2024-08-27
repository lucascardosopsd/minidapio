"use client";

import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000 }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
      if (isInView) {
        const interval = setInterval(() => {
          setIndex((prevIndex) => {
            if (prevIndex + 1 < childrenArray.length) {
              return prevIndex + 1; // Incrementa enquanto não estiver no final
            } else {
              clearInterval(interval); // Para o intervalo quando atingir o final
              return prevIndex; // Retorna o índice final sem incrementar
            }
          });
        }, delay);

        return () => clearInterval(interval);
      }
    }, [childrenArray.length, delay, isInView]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1),
      [index, childrenArray]
    );

    return (
      <div className={cn(`flex flex-col gap-4 ${className}`)} ref={ref}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}
