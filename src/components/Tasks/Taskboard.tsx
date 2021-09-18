import React from "react";
import { formatDistance } from "date-fns";
import { FamilyTaskInfoFragment } from "../../generated/graphql";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

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
  { field: "payment", headerName: "Payment", width: 48 },
  {
    field: "isCompleted",
    headerName: "Completed",
    valueFormatter: (params: GridValueFormatterParams) =>
      Boolean(params.value) ? "Yes" : "No",
    width: 48,
  },
];

export const Taskboard = ({ data }: TaskboardProps) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
};
