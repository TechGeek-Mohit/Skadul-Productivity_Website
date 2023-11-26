import React, { forwardRef } from "react";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <Input
    autoComplete="off"
    background="white"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
  />
));

const DatePicker = ({ selected, onChange }) => {
  return (
    <InputGroup style={{ zIndex: 1 }}>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        dateFormat="Pp"
        customInput={<CustomInput />}
      />
      <InputRightElement
        color="gray.500"
        children={<CalendarIcon fontSize="sm" />}
      />
    </InputGroup>
  );
};

export default DatePicker;
