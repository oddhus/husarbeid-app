import { CircularProgress, Container, Typography } from "@material-ui/core";
import React from "react";
import { useGetUserInfoQuery } from "../../generated/graphql";

const MyAccount = () => {
  const { data, loading, error } = useGetUserInfoQuery();
  console.log(data);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h1">Account</Typography>
      <Typography>{data?.findUser.user?.username}</Typography>
    </Container>
  );
};

export default MyAccount;
