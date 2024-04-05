import { useState } from "react";

const Carousel = ({ items }: { items: React.ReactNode[] }) => {
  const [index, setIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? items.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= items.length ? 0 : newIndex);
  };
  return (
    <div className="relative max-w-lg mx-auto">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {items.map((item, i) => (
          <div
            key={i}
            className={`absolute top-0 left-0 w-full h-full p-3 duration-700 ease-in-out transform ${
              index == i ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevious}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <PreviousIcon />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <NextIcon />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;

const NextIcon = () => {
  return (
    <svg
      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
};

const PreviousIcon = () => {
  return (
    <svg
      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  );
};
