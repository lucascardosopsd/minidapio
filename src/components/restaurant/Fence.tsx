import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface FenceProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode | ReactNode[];
}

const Fence = ({ children, className, ...rest }: FenceProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-2 border border-border gap-2 rounded flex-1",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Fence;
