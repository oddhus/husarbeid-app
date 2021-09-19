import React from "react";
import { formatDistance } from "date-fns";
import { FamilyTaskInfoFragment } from "../../generated/graphql";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Avatar, Box, Chip } from "@mui/material";
import { useRecoilState } from "recoil";
import { selectedTaskState } from "./selectedTaskAtom";
import { stringAvatar } from "../../utils/avatarUtils";

interface TaskboardProps {
  data: FamilyTaskInfoFragment[];
}

const StatusCell = (params: GridRenderCellParams) => {
  const assignedTo = params.getValue(params.id, "assignedTo") as {
    username: string;
  };
  if (assignedTo) {
    return <Avatar {...stringAvatar(assignedTo.username.toString() || "NN")} />;
  }

  const isCompleted = params.getValue(params.id, "isCompleted");
  if (Boolean(isCompleted)) {
    return <Chip label="Completed" color="secondary" variant="outlined" />;
  }

  return <Chip label="Available" color="primary" variant="outlined" />;
};

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
  { field: "payment", headerName: "Payment", width: 100 },
  { field: "Status", renderCell: StatusCell },
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
