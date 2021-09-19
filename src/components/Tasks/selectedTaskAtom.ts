import { GridSelectionModel } from "@mui/x-data-grid";
import { atom } from "recoil";

export const selectedTaskState = atom<GridSelectionModel>({
  key: "selectedTaskState",
  default: [],
});
