export function HeroSkeleton() {
  return (
    <div className="flex items-center flex-col-reverse md:flex-row lg:gap-4 animate-pulse">
      <div className="w-full flex flex-col items-center md:w-7/12 md:items-start">
        <div className="flex flex-col gap-2 md:gap-4 w-full items-center md:items-start mt-10 md:mt-0">
          <div className="h-10 md:h-16 w-full md:w-1/2 bg-gray-200" />
          <div className="h-10 md:h-16 w-full md:w-2/3 bg-gray-200" />
          <div className="h-10 md:h-16 w-1/2 md:w-1/3 bg-gray-200" />
        </div>

        <div className="w-40 mt-10 h-[50px] bg-gray-200" />
      </div>

      <div className="flex-shrink-0 w-full md:w-5/12 flex justify-end">
        <div className="w-full bg-gray-200 aspect-[3/4] max-w-sm" />
      </div>
    </div>
  );
}
