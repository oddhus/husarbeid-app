import { Center, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";
import { useGetFamilyTasksQuery } from "../../generated/graphql";
import { TaskboardItem } from "./TaskboardItem";

export const FamilyTaskList = () => {
  const { data, loading, error } = useGetFamilyTasksQuery();

  if (loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  if (!data || !data.familyTasks) {
    return (
      <Center>
        <Text>No tasks</Text>
      </Center>
    );
  }

  return (
    <>
      {data.familyTasks.map((task) => (
        <TaskboardItem task={task} />
      ))}
    </>
  );
};
