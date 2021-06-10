import { selector } from "recoil";
import { userState } from "./authAtom";

export const isLoggedInState = selector({
  key: "isLoggedInState",
  get: ({ get }) => {
    const user = get(userState);

    return !!user?.userId && !!user?.username;
  },
});
