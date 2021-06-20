import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "./components/Authentication/authAtom";
import { Navbar } from "./components/Navbar/Navbar";
import { AppRoutes } from "./routes/AppRoutes";
import { retrieveUserWithToken } from "./utils/tokenUtils";
import { compareDesc } from "date-fns";

const App = () => {
  const setAuthAtom = useSetRecoilState(userState);

  useEffect(() => {
    const userData = retrieveUserWithToken();
    if (
      userData &&
      compareDesc(new Date(), new Date(userData.expirationTime)) === 1
    ) {
      setAuthAtom(userData.user);
    }
  }, []);

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
