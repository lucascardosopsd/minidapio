const BottomFade = ({ className }: { className?: string }) => {
  return (
    <div
      className={
        "absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent cursor-none pointer-events-none" +
        className
      }
    />
  );
};

export default BottomFade;
