import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker-chakra-ui.css";

type Props = {
  control: Control<any>;
  fieldname: string;
  placeholder: string;
};

export const CustomDatePicker: React.FC<Props> = ({
  control,
  fieldname,
  placeholder,
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={fieldname}>{fieldname}</FormLabel>
      <Controller
        control={control}
        name={fieldname}
        render={(props) => (
          <DatePicker
            className="input"
            placeholderText={placeholder}
            onChange={(e) => props.field.onChange(e)}
            selected={props.field.value}
            dateFormat="dd/MM/yyyy"
            isClearable
            showPopperArrow
          />
        )}
      />
    </FormControl>
  );
};
