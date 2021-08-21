import { Box, Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FamilyTaskInfoFragment } from "../../generated/graphql";

type Props = {
  task: FamilyTaskInfoFragment;
};

export const TaskboardItem: React.FC<Props> = ({ task }) => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem colSpan={3}>
        <Heading size="md">{task.shortDescription}</Heading>
      </GridItem>
      <GridItem>
        <Text>{task.payment}</Text>
      </GridItem>
    </Grid>
  );
};
