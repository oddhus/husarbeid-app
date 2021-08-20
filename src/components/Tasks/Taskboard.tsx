import { Container } from "@chakra-ui/react";
import React from "react";
import { FamilyTaskList } from "./FamilyTaskList";
import { UserTaskList } from "./UserTaskList";

export const Taskboard = () => {
  return (
    <Container maxW="md">
      <FamilyTaskList />
      <UserTaskList />
    </Container>
  );
};
