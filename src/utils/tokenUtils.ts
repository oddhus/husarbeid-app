import { storedUser } from "../types";
import { addHours } from "date-fns";

export const saveTokenAndUser = (
  token: string,
  userId: string,
  username: string,
  familyId?: string | null
) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      user: {
        userId,
        username,
        familyId,
      },
      expirationTime: addHours(new Date(), 3),
    })
  );
};

export const retrieveUserWithToken = () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    return JSON.parse(storedData) as storedUser;
  }
};

export const addFamilyId = (familyId: string) => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const userData = JSON.parse(storedData) as storedUser;
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        user: {
          ...userData.user,
          familyId,
        },
      })
    );
  }
};

export const retrieveToken = () => {
  return retrieveUserWithToken()?.token;
};

export const removeToken = () => {
  localStorage.removeItem("userData");
};
