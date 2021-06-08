import { Container } from "@chakra-ui/layout";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <Container maxW="md">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Container>
  );
};

export default App;
