import { Button } from "@chakra-ui/button";
import { Box, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import { Register } from "./Register";
import { SignIn } from "./SignIn";

export const Authentication = () => {
  const [register, setRegister] = useState(false);
  return (
    <Container maxW="md">
      <Box pt={2}>
        {register ? <Register /> : <SignIn />}
        <Button variant="ghost" onClick={() => setRegister(!register)}>
          Not registered?
        </Button>
      </Box>
    </Container>
  );
};
