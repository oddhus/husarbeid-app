import {
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import LoadingButton from "@material-ui/lab/LoadingButton";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  GetFamilyTasksDocument,
  useCreateTaskMutation,
} from "../../generated/graphql";
import { userState } from "../Authentication/authAtom";
import { createTaskStatusState } from "./createTaskStatusAtom";

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
  const setCreateTaskStatus = useSetRecoilState(createTaskStatusState);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
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
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              size="small"
              //sx={{ height: "48px" }}
              fullWidth
              id="payment"
              placeholder="Payment"
              {...register("payment", {
                required: "This is required",
              })}
              type="number"
              error={!!errors.payment}
              helperText={errors.payment && errors.payment.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row">
              <LoadingButton
                fullWidth
                variant="outlined"
                loading={isSubmitting}
                type="submit"
              >
                Create Task
              </LoadingButton>
              <IconButton
                sx={{ ml: 2 }}
                onClick={() => setCreateTaskStatus(false)}
              >
                <Close />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        {errorMessage && <Typography>{errorMessage}</Typography>}
      </Stack>
    </form>
  );
};
