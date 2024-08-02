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
          role="presentation"
          className={`bg-slate-400 dark:bg-slate-700 animate-pulse ${className}`}
        ></div>
      ))}
    </>
  );
};

export default Skeleton;
