import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Text,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  GetFamilyTasksDocument,
  useCreateTaskMutation,
  useGetFamilyTasksQuery,
} from "../../generated/graphql";
import { userState } from "../Authentication/authAtom";

type Input = {
  shortDescription: string;
  payment: number;
};

export const CreateTask = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Input>();

  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const user = useRecoilValue(userState);

  const [createTaskMutation, { data, loading, error }] =
    useCreateTaskMutation();

  const onSubmit = async ({ payment, shortDescription }: Input) => {
    if (user?.familyId) {
      try {
        const response = await createTaskMutation({
          variables: { familyId: user.familyId, payment, shortDescription },
          update: (cache, mutationResult) => {
            let data = cache.readQuery<any>({
              query: GetFamilyTasksDocument,
            });
            data = Object.assign({}, data);
            data.familyTasks = [
              ...data.familyTasks,
              mutationResult.data?.addFamilyTask.familyTask,
            ];
            cache.writeQuery({ query: GetFamilyTasksDocument, data });
          },
        });
        if (response.data && !response.errors) {
        }
      } catch (error) {}
    }
  };

  return (
    <Container maxW="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.shortDescription}>
          <FormLabel htmlFor="name">User name</FormLabel>
          <Textarea
            id="shortDescription"
            placeholder="shortDescription"
            {...register("shortDescription", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.shortDescription && errors.shortDescription.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.payment}>
          <FormLabel htmlFor="payment">Payment</FormLabel>
          <NumberInput
            id="payment"
            {...register("payment", {
              required: "This is required",
            })}
            defaultValue={10}
            onChange={(valueString) => setValue("payment", Number(valueString))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {errors.payment && errors.payment.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Create Task
        </Button>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      </form>
    </Container>
  );
};
