import { atom } from "recoil";

export const createTaskStatusState = atom<boolean>({
  key: "createTaskStatus",
  default: false,
});
