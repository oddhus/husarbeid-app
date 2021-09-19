import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { FamilyTaskInfoFragment } from "../../generated/graphql";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTaskState } from "./selectedTaskAtom";

interface TaskboardProps {
  data: FamilyTaskInfoFragment[];
}

const columns: GridColDef[] = [
  { field: "shortDescription", headerName: "Description", flex: 1 },
  {
    field: "createdOn",
    headerName: "Created On",
    type: "date",
    width: 150,
    valueFormatter: (params: GridValueFormatterParams) => {
      if (!params.value) {
        return "Missing date";
      }
      return formatDistance(new Date(params.value.toString()), new Date(), {
        addSuffix: true,
      });
    },
  },
  { field: "payment", headerName: "Payment", width: 150 },
  {
    field: "isCompleted",
    headerName: "Completed",
    valueFormatter: (params: GridValueFormatterParams) =>
      Boolean(params.value) ? "Yes" : "No",
    width: 150,
  },
];

export const Taskboard = ({ data }: TaskboardProps) => {
  const [selectionModel, setSelectionModel] = useRecoilState(selectedTaskState);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        autoPageSize
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        isRowSelectable={(params: GridRowParams) => !params.row.assignedTo}
        selectionModel={selectionModel}
      />
    </div>
  );
};
