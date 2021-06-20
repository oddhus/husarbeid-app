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
    const data = JSON.parse(storedData) as storedUser;
    return data;
  }
};

export const retrieveToken = () => {
  return retrieveUserWithToken()?.token;
};

export const removeToken = () => {
  localStorage.removeItem("userData");
};
