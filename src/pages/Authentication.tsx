import { Button } from "@chakra-ui/button";
import React, { useState } from "react";
import { Register } from "../components/Authentication/Register";
import { SignIn } from "../components/Authentication/SignIn";

export const Authentication = () => {
  const [register, setRegister] = useState(false);
  return (
    <div>
      {register ? <Register /> : <SignIn />}
      <Button variant="ghost" onClick={() => setRegister(!register)}>
        Not registered?
      </Button>
    </div>
  );
};
