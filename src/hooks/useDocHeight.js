import { useEffect, useState } from "react";

const useDocHeight = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight + 50);

  const handleResize = () => {
    setWindowHeight(window.innerHeight + 50);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowHeight;
};

export default useDocHeight;
