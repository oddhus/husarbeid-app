import { Container } from "@chakra-ui/react";
import React from "react";
import { TaskList } from "./TaskList";

export const Taskboard = () => {
  return (
    <Container maxW="md">
      <TaskList />
    </Container>
  );
};
