import { Link } from "react-router-dom";

const BackButton = ({ to }: { to: string }) => {
  return (
    <button className="btn hover:btn-primary btn-neutral btn-sm lg:btn-md text-white font-bold py-2 px-4 rounded fixed right-5 bottom-5">
      <Link to={to}>Back</Link>
    </button>
  );
};

export default BackButton;
