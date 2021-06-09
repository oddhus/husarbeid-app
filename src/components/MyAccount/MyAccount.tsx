import { Container, Heading, Text } from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/progress";
import React from "react";
import { useGetUserInfoQuery } from "../../generated/graphql";

const MyAccount = () => {
  const { data, loading, error } = useGetUserInfoQuery();
  console.log(data);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxW="md">
      <Heading>Account</Heading>
      <Text>{data?.findUser.user?.username}</Text>
    </Container>
  );
};

export default MyAccount;
