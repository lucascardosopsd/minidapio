const Loading = () => {
  return (
    <div className="flex flex-col items-center w-full h-svh relative">
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold z-10">
        Carregando
      </p>

      <div className="h-24 flex items-center w-full gap-5 bg-muted/50 pr-5 flex-1">
        <div className="h-full w-24 bg-muted animate-pulse" />

        <div className="flex flex-col justify-center flex-[3] gap-2 h-full">
          <div className="w-full h-4 bg-muted animate-pulse rounded" />
          <div className="w-1/3 h-4 bg-muted animate-pulse rounded" />
        </div>

        <div className="w-10 h-10 bg-muted animate-pulse rounded" />
        <div className="w-10 h-10 bg-muted animate-pulse rounded" />
      </div>

      <div className="w-full h-16 p-5 flex items-center justify-center bg-muted/25 ">
        <div className="w-full h-8 rounded-lg bg-muted animate-pulse" />
      </div>

      <div className="w-full h-16 p-5 gap-5 flex items-center justify-center bg-muted/50 ">
        <div className="w-full h-5 rounded-lg bg-muted animate-pulse flex-1" />
        <div className="w-full h-5 rounded-lg bg-muted animate-pulse flex-1" />
        <div className="w-full h-5 rounded-lg bg-muted animate-pulse flex-1" />
      </div>

      <div className="h-full w-full flex-[5] bg-muted/50 flex flex-col gap-5 items-center p-5">
        <div className="h-24 w-full bg-muted rounded animate-pulse" />
        <div className="h-24 w-full bg-muted rounded animate-pulse" />
        <div className="h-24 w-full bg-muted rounded animate-pulse" />
        <div className="h-24 w-full bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
