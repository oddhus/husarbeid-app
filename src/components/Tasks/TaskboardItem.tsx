import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import {
  FamilyInfoFragment,
  FamilyTaskInfoFragment,
} from "../../generated/graphql";

type Props = {
  task: FamilyTaskInfoFragment;
};

export const TaskboardItem: React.FC<Props> = ({ task }) => {
  return (
    <Box>
      <Heading size="md">{task.shortDescription}</Heading>
    </Box>
  );
};
