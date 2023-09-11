import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/authContext";
import { Header } from "./components";
import "./App.css";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <ChakraProvider>
          <Header />
          <main>
            <Outlet />
          </main>
        </ChakraProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
