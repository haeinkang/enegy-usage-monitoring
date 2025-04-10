const LoadingIndicator = () => (
  <div className="flex h-full w-full items-center justify-center gap-7">
    <span className="relative flex size-5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-customGreen opacity-75"
        style={{ animationDelay: "0s" }}
      ></span>
      <span className="relative inline-flex size-5 rounded-full bg-customGreen"></span>
    </span>
    <span className="relative flex size-5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-customGreen opacity-75"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span className="relative inline-flex size-5 rounded-full bg-customGreen"></span>
    </span>
    <span className="relative flex size-5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-customGreen opacity-75"
        style={{ animationDelay: "0.4s" }}
      ></span>
      <span className="relative inline-flex size-5 rounded-full bg-customGreen"></span>
    </span>
  </div>
);

export default LoadingIndicator;
