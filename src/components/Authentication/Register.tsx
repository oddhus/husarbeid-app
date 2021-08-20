import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePicker } from "../shared/CustomDatePicker";
import { useRegisterMutation } from "../../generated/graphql";
import { saveTokenAndUser } from "../../utils/tokenUtils";
import { useSetRecoilState } from "recoil";
import { userState } from "./authAtom";
import { useHistory } from "react-router-dom";
import { NavLink } from "../shared/NavLink";

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
    <VStack display="flex" p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">User name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="name">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <CustomDatePicker
          control={control}
          fieldname="birthDate"
          placeholder="DD/MM/YYYY"
        />
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Register
        </Button>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      </form>
      <NavLink to={"/signin"}>Har du allerede en konto? Logg inn!</NavLink>
    </VStack>
  );
};
