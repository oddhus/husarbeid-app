import { atom } from "recoil";
import { User } from "../../types";

export const userState = atom<User | undefined>({
  key: "userState",
  default: {
    userId: "",
    username: "",
    familyId: "",
  },
});
