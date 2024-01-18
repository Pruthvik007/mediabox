import { Outlet } from "react-router-dom";
import "./App.css";
import Modal from "./components/common/Modal";
import ContextProvider from "./context/ContextProvider";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="bg-base-300" id="App">
      <ContextProvider>
        <NavBar />
        <Outlet />
        <Modal />
      </ContextProvider>
    </div>
  );
}

export default App;
