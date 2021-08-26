import { Container, Stack, TextField, Typography } from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  GetFamilyTasksDocument,
  useCreateTaskMutation,
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
    <Container sx={{ pt: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            multiline
            minRows={3}
            id="shortDescription"
            placeholder="shortDescription"
            {...register("shortDescription", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
            error={!!errors.shortDescription}
            helperText={
              errors.shortDescription && errors.shortDescription.message
            }
          />
          <TextField
            id="payment"
            placeholder="Payment"
            {...register("payment", {
              required: "This is required",
            })}
            type="number"
            error={!!errors.payment}
            helperText={errors.payment && errors.payment.message}
          />
          <LoadingButton sx={{ mt: 4 }} loading={isSubmitting} type="submit">
            Create Task
          </LoadingButton>
          {errorMessage && <Typography>{errorMessage}</Typography>}
        </Stack>
      </form>
    </Container>
  );
};
