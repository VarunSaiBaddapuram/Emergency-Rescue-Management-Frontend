import { useNavigate } from "react-router-dom";

const useAgencyNavigate = () => {
  const navigate = useNavigate();

  return (path, options = {}) => {
    navigate(path, options);
  };
};

export default useAgencyNavigate;
