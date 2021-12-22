import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IStudent } from "../../interfaces/Interface";
import { useEffect } from "react";

const AddStudent = () => {
  const [student, setStudent] = useState<IStudent>({
    ID: 0,
    firstName: "",
    lastName: "",
    age: "",
    education: ""
  });

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [ageError, setAgeError] =useState<string>("");
  const [educationError, setEducationError] =useState<string>("");

  const hanleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setStudent({ ...student, [e.target.name]: e.target.value });

    if (student.firstName !== "")
    setFirstNameError("")
    if (student.lastName !== "")
    setLastNameError("")
    if (student.age !== "")
    setAgeError("")
    if (student.education !== "")
    setEducationError("")
  };

  const handleSubmit = ():void => {
    if (student.firstName === "")
    setFirstNameError("please enter your first name")
    if (student.lastName === "")
    setLastNameError("please enter your last name")
    if (student.age === "")
    setAgeError("please enter your age")
    if (student.education === "")
    setEducationError("please enter your education")
    console.log(student)
  };

  return (
    <div>
      <h1>create new student</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ width: 200 }}>
          <TextField
            required
            error={firstNameError.length>0}
            id="outlined-required"
            label="first name"
            placeholder="first name"
            helperText={firstNameError}
            name="firstName"
            value={student.firstName}
            onChange={(elenent) => hanleChanges(elenent)}
          />
          <TextField
            required
            error={lastNameError.length>0}
            id="outlined-required"
            label="last name"
            placeholder="last name"
            helperText={lastNameError}
            name="lastName"
            value={student.lastName}
            onChange={(elenent) => hanleChanges(elenent)}
          />
          <TextField
            required
            error={ageError.length>0}
            id="outlined-number"
            label="age"
            type="number"
            placeholder="age"
            helperText={ageError}
            InputLabelProps={{
              shrink: true,
            }}
            name="age"
            value={student.age}
            onChange={(elenent) => hanleChanges(elenent)}
          />
          <TextField
            required
            error={educationError.length>0}
            id="outlined-required"
            label="education"
            placeholder="education"
            helperText={educationError}
            name="education"
            value={student.education}
            onChange={(elenent) => hanleChanges(elenent)}
          />
        </div>
      </Box>
      <Button variant="contained" onClick={() => handleSubmit()}>
        add
      </Button>
      <br />
    </div>
  );
};

export default AddStudent;
