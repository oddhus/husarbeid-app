import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../generated/graphql";
import { useHistory } from "react-router";
import { saveTokenAndUser } from "../../utils/tokenUtils";
import { useSetRecoilState } from "recoil";
import { userState } from "./authAtom";
import { NavLink } from "../shared/NavLink";
import { Box, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

type Inputs = {
  name: string;
  password: string;
};

export const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [loginMutation] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useSetRecoilState(userState);
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = async (variables) => {
    const response = await loginMutation({ variables });
    if (response.data?.loginUser.token && response.data.loginUser.user) {
      const { token, user } = response.data.loginUser;
      saveTokenAndUser(token, user.id, user.username, user.familyId);
      setUser({
        userId: user.id,
        username: user.username,
        familyId: user.familyId,
      });
      history.push("/");
    } else if (
      response.data?.loginUser.errors &&
      response.data.loginUser.errors.length > 0
    ) {
      setErrorMessage(response.data.loginUser.errors[0].message);
    } else {
      setErrorMessage("Something went wrong. Please try again later");
    }
  };

  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
            error={!!errors.name}
            helperText={!!errors.name && errors.name.message}
          />
          <TextField
            variant="outlined"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
            error={!!errors.password}
            helperText={!!errors.password && errors.password.message}
          />
          <LoadingButton sx={{ mt: 4 }} loading={isSubmitting} type="submit">
            Login
          </LoadingButton>
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <NavLink to={"/register"}>
            Har du ikke opprettet en konto ennå? Trykk her!
          </NavLink>
        </Stack>
      </form>
    </Box>
  );
};
