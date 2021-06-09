import { storedUser } from "../types";

export const saveToken = (token: string) => {
  localStorage.setItem("userData", JSON.stringify({ token }));
};

export const retrieveToken = () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const data = JSON.parse(storedData) as storedUser;
    return data.token;
  } else {
  }
};

export const removeToken = () => {
  localStorage.removeItem("userData");
};
