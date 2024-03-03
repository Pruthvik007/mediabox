type SkeletonProps = {
  count?: number;
  className: string;
};
const Skeleton = ({ count = 1, className }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          role="placeholder"
          className={`bg-slate-400 dark:bg-slate-700 max-w-sm animate-pulse ${className}`}
        ></div>
      ))}
    </>
  );
};

export default Skeleton;
