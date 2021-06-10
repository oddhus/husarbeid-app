import { Container } from "@chakra-ui/layout";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;
