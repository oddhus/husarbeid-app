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
      userId,
      username,
      familyId,
      expirationTime: addHours(new Date(), 1),
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

export const retrieveTokenAndUser = () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const data = JSON.parse(storedData) as storedUser;
    return data;
  }
};

export const retrieveToken = () => {
  return retrieveTokenAndUser()?.token;
};

export const removeToken = () => {
  localStorage.removeItem("userData");
};
