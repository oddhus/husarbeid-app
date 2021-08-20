import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useCreateFamilyMutation } from "../../generated/graphql";
import { addFamilyId } from "../../utils/tokenUtils";
import { userState } from "../Authentication/authAtom";

interface Input {
  familyName: string;
}

export const CreateFamily = () => {
  const [dbError, setDbError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const [createFamilyMutation, { data, loading, error }] =
    useCreateFamilyMutation();

  const setUserState = useSetRecoilState(userState);

  const registerFamily = async ({ familyName }: { familyName: string }) => {
    try {
      const response = await createFamilyMutation({
        variables: { familyName },
      });
      if (response.data && !response.errors) {
        const familyId = response.data.createFamily.family!.id;
        addFamilyId(familyId);
        setUserState((user) => {
          if (!user) {
            return;
          }
          return { ...user, familyId };
        });
      }
      console.log(response);
    } catch (e) {
      setDbError("An error occured");
    }
  };

  return (
    <form onSubmit={handleSubmit(registerFamily)}>
      <FormControl isInvalid={!!errors.familyName}>
        <FormLabel htmlFor="familyName">Family Name</FormLabel>
        <Input
          id="familyName"
          placeholder="familyName"
          {...register("familyName", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.familyName && errors.familyName.message}
        </FormErrorMessage>
      </FormControl>
      <Button isLoading={isSubmitting} type="submit">
        Create Family
      </Button>
      {dbError && <Text color="red.500">{dbError}</Text>}
    </form>
  );
};
