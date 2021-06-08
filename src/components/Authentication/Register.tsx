import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePicker } from "../shared/CustomDatePicker";

type Inputs = {
  name: string;
  password: string;
  birthday: Date;
};

export const Register = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(null);
      }, 3000);
    });
  };

  return (
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
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Password</FormLabel>
        <Input
          id="password"
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
        fieldname="Birthday"
        placeholder="DD/MM/YYYY"
      />
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Register
      </Button>
    </form>
  );
};
