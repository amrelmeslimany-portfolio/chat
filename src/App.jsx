import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { CUSTOM_THEME } from "./constants/theme";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RouterStructure from "./pages/RoutersStructure";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { darkMode } = useSelector((state) => state.global);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return (
    <ConfigProvider theme={CUSTOM_THEME(darkMode)}>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <RouterStructure />
        </BrowserRouter>
      </AnimatePresence>
    </ConfigProvider>
  );
}

export default App;
