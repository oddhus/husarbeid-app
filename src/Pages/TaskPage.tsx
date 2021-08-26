import { Button, Container, Stack } from "@material-ui/core";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../components/Authentication/authAtom";
import { CreateFamily } from "../components/Family/CreateFamily";
import { CreateTask } from "../components/Tasks/CreateTask";
import { createTaskStatusState } from "../components/Tasks/createTaskStatusAtom";
import { FamilyTaskList } from "../components/Tasks/FamilyTaskList";

export const TaskPage = () => {
  const user = useRecoilValue(userState);
  const [createTaskStatus, setCreateTaskStatus] = useRecoilState(
    createTaskStatusState
  );

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
          <FamilyTaskList />
        </Stack>
      ) : (
        <CreateFamily />
      )}
    </Container>
  );
};
