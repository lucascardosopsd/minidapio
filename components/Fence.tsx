import { ReactNode } from "react";

const Fence = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <div className="flex items-center justify-center p-2 border border-border gap-2 rounded flex-1">
      {children}
    </div>
  );
};

export default Fence;
