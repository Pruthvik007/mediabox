import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn hover:btn-primary btn-neutral btn-sm lg:btn-md text-white font-bold py-2 px-4 rounded fixed right-5 bottom-5"
    >
      Back
    </button>
  );
};

export default BackButton;
