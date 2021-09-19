import { Box, Button, Container, Fab, Stack } from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../components/Authentication/authAtom";
import { CreateFamily } from "../components/Family/CreateFamily";
import { CreateTask } from "../components/Tasks/CreateTask";
import { createTaskStatusState } from "../components/Tasks/createTaskStatusAtom";
import { FamilyTaskList } from "../components/Tasks/FamilyTaskList";
import AddIcon from "@mui/icons-material/Add";
import { selectedTaskState } from "../components/Tasks/selectedTaskAtom";
import { useClaimTasksMutation } from "../generated/graphql";

export const TaskPage = () => {
  const user = useRecoilValue(userState);
  const [createTaskStatus, setCreateTaskStatus] = useRecoilState(
    createTaskStatusState
  );
  const [selectedTasks, setSelectedTasks] = useRecoilState(selectedTaskState);

  const [claimTasksMutation, { data, loading, error }] =
    useClaimTasksMutation();

  const onClaimTask = () => {
    claimTasksMutation({ variables: { taskIds: selectedTasks as string[] } });
  };

  return (
    <Container sx={{ pt: 2 }}>
      {user?.familyId ? (
        <Stack spacing={2}>
          {createTaskStatus && <CreateTask />}
          {!createTaskStatus && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCreateTaskStatus(true)}
            >
              Create Task
            </Button>
          )}
          {selectedTasks.length > 0 && (
            <Button variant="outlined" color="secondary" onClick={onClaimTask}>
              {selectedTasks.length === 1 ? "Claim Task" : "Claim Tasks"}
            </Button>
          )}
          <FamilyTaskList />
        </Stack>
      ) : (
        <CreateFamily />
      )}
    </Container>
  );
};
