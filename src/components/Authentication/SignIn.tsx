import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../generated/graphql";
import { useHistory } from "react-router";
import { saveTokenAndUser } from "../../utils/tokenUtils";
import { useSetRecoilState } from "recoil";
import { userState } from "./authAtom";
import { NavLink } from "../shared/NavLink";

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
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">User name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 3, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 3, message: "Minimum length should be 8" },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Login
        </Button>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      </form>
      <NavLink to={"/register"}>
        Har du ikke opprettet en konto ennå? Trykk her!
      </NavLink>
    </VStack>
  );
};
