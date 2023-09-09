import { Outlet } from "react-router-dom";

import { AuthContextProvider } from "./context/authContext";

import "./App.css";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <main>
          <Outlet />
        </main>
      </AuthContextProvider>
    </>
  );
};

export default App;
