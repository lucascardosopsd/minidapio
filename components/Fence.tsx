import { ReactNode } from "react";

interface FenceProps {
  className: string;
  children: ReactNode | ReactNode[];
}

const Fence = ({ children, className }: FenceProps) => {
  return (
    <div
      className={`flex items-center justify-center p-2 border border-border gap-2 rounded flex-1 ${className}`}
    >
      {children}
    </div>
  );
};

export default Fence;
