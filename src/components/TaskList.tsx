import { Center, CircularProgress, Heading } from "@chakra-ui/react";
import React from "react";
import { useGetUserTasksQuery } from "../generated/graphql";
import { TaskboardItem } from "./TaskboardItem";

export const TaskList = () => {
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
        <Heading>No tasks</Heading>
      </Center>
    );
  }

  return (
    <>
      {data.findUser.user!.userTasks.map((task) => {
        <TaskboardItem task={task!} />;
      })}
    </>
  );
};
