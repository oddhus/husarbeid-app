import { Container } from "@chakra-ui/layout";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <Container maxW="md">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
