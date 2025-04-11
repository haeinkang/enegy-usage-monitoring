function LeftPanel() {
  return (
    <div
      className="
        absolute inset-0 z-10
        max-w-[600px]
        lg:w-[45vw]
        md:w-[48vw]
        sm:w-[50vw]
        sm:inset-4
      "
    >
      <div
        className={`
          w-full h-full
          bg-white border p-5 pt-10
          border-neutral-200
          transition-all duration-200 ease-in
          sm:rounded-2xl
          sm:bg-white/80 
          sm:backdrop-blur-md 
          sm:shadow-xl
        `}
      ></div>
    </div>
  );
}

export default LeftPanel;

// sm:inset-3 sm:bottom-[8.5rem]
// sm:h-auto sm:pt-0
