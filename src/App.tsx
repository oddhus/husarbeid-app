import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "./components/Authentication/authAtom";
import { AppRoutes } from "./routes/AppRoutes";
import { retrieveUserWithToken } from "./utils/tokenUtils";
import { compareDesc } from "date-fns";
import { Navbar } from "./components/Navbar/Navbar";
import { CssBaseline } from "@mui/material";

const App = () => {
  const setAuthAtom = useSetRecoilState(userState);

  useEffect(() => {
    const userData = retrieveUserWithToken();
    console.log(userData);
    if (
      userData &&
      compareDesc(new Date(), new Date(userData.expirationTime)) === 1
    ) {
      setAuthAtom(userData.user);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;
