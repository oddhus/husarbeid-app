import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useGetFamilyTasksQuery } from "../../generated/graphql";
import { Taskboard } from "./Taskboard";

export const FamilyTaskList = () => {
  const { data, loading, error } = useGetFamilyTasksQuery();

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || !data.familyTasks) {
    return (
      <Box>
        <Typography>No tasks</Typography>
      </Box>
    );
  }

  return (
    <>
      <Taskboard data={data.familyTasks} />
    </>
  );
};
