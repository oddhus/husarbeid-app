import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "../../generated/graphql";
import { saveTokenAndUser } from "../../utils/tokenUtils";
import { useSetRecoilState } from "recoil";
import { userState } from "./authAtom";
import { useHistory } from "react-router-dom";
import { NavLink } from "../shared/NavLink";
import { Box, Stack, TextField, Typography } from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DatePicker from "@material-ui/lab/DatePicker";

type Inputs = {
  name: string;
  password: string;
  birthDate: Date;
};

export const Register = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const [registerMutation] = useRegisterMutation();
  const setUser = useSetRecoilState(userState);
  const history = useHistory();
  const [value, setValue] = React.useState<Date | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (variables) => {
    const response = await registerMutation({ variables });
    if (response.data?.createUser.token && response.data.createUser.user) {
      const { token, user } = response.data.createUser;
      saveTokenAndUser(token, user.id, user.username, user.familyId);
      setUser({
        userId: user.id,
        username: user.username,
        familyId: user.familyId,
      });
      history.push("/");
    } else if (
      response.data?.createUser.errors &&
      response.data.createUser.errors.length > 0
    ) {
      setErrorMessage(response.data.createUser.errors[0].message);
    } else {
      setErrorMessage("Something went wrong. Please try again later");
    }
  };

  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birth Date"
              InputProps={{
                name: "birthDate",
              }}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...register("birthDate")} {...params} />
              )}
            />
          </LocalizationProvider>
          <LoadingButton sx={{ mt: 4 }} loading={isSubmitting} type="submit">
            Register
          </LoadingButton>
          {errorMessage && (
            <Typography color="red.500">{errorMessage}</Typography>
          )}
          <NavLink to={"/signin"}>Har du allerede en konto? Logg inn!</NavLink>
        </Stack>
      </form>
    </Box>
  );
};
