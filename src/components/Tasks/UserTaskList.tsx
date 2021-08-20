import { Center, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";
import { useGetUserTasksQuery } from "../../generated/graphql";
import { TaskboardItem } from "./TaskboardItem";

export const UserTaskList = () => {
  const { data, loading, error } = useGetUserTasksQuery();

  if (loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  if (!data || !data.findUser.user?.userTasks) {
    return (
      <Center>
        <Text>No tasks</Text>
      </Center>
    );
  }

  return (
    <>
      {data.findUser.user.userTasks.map((task) => (
        <TaskboardItem task={task!} />
      ))}
    </>
  );
};
