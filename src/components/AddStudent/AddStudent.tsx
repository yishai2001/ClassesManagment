import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IStudent } from "../../interfaces/Interface";
import { useContext } from "react";
import ThemeContext from "./../ThemeContext/ThemeContext";

const AddStudent = () => {
  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: blueMode ? "#1976d2" : "#e73f3f",
  };

  const [newStudent, setNewStudent] = useState<IStudent>({
    ID: 0,
    firstName: "",
    lastName: "",
    age: "",
    education: "",
  });

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [educationError, setEducationError] = useState<string>("");
  const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);

  //validetion after tried to submit once
  useEffect(() => {
    if (newStudent.firstName === "" && isClikedOnce)
      setFirstNameError("please enter your first name");
    else setFirstNameError("");

    if (newStudent.lastName === "" && isClikedOnce)
      setLastNameError("please enter your last name");
    else setLastNameError("");

    if (newStudent.age === "" && isClikedOnce)
      setAgeError("please enter your age");
    else setAgeError("");

    if (newStudent.education === "" && isClikedOnce)
      setEducationError("please enter your education");
    else setEducationError("");

  }, [newStudent]);

  const hanleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });

    if (newStudent.firstName !== "") setFirstNameError("");
    if (newStudent.lastName !== "") setLastNameError("");
    if (newStudent.age !== "") setAgeError("");
    if (newStudent.education !== "") setEducationError("");
  };

  const validation = (): boolean => {
    if (newStudent.firstName === "")
      setFirstNameError("please enter your first name");
    if (newStudent.lastName === "")
      setLastNameError("please enter your last name");
    if (newStudent.age === "") 
      setAgeError("please enter your age");
    if (newStudent.education === "")
      setEducationError("please enter your education");
    return (newStudent.firstName !== "" && newStudent.lastName !== "" && newStudent.age !== "" && newStudent.education !== "")
  }

  const handleSubmit = (): void => {
    if (!isClikedOnce) setIsClickedOnce(true);
    if (validation())
      console.log(newStudent);
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
            error={firstNameError.length > 0}
            id="outlined-required"
            label="first name"
            placeholder="first name"
            helperText={firstNameError}
            name="firstName"
            value={newStudent.firstName}
            onChange={(elenent) => hanleChanges(elenent)}
          />
          <TextField
            required
            error={lastNameError.length > 0}
            id="outlined-required"
            label="last name"
            placeholder="last name"
            helperText={lastNameError}
            name="lastName"
            value={newStudent.lastName}
            onChange={(elenent) => hanleChanges(elenent)}
          />
          <TextField
            required
            error={ageError.length > 0}
            id="outlined-required"
            label="age"
            placeholder="age"
            helperText={ageError}
            name="age"
            type="number"
            value={newStudent.age}
            onChange={(elenent) => hanleChanges(elenent)}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
          />
          <TextField
            required
            error={educationError.length > 0}
            id="outlined-required"
            label="education"
            placeholder="education"
            helperText={educationError}
            name="education"
            value={newStudent.education}
            onChange={(elenent) => hanleChanges(elenent)}
          />
        </div>
      </Box>
      <Button
        style={themeStyles}
        variant="contained"
        onClick={() => handleSubmit()}
      >
        add
      </Button>
      <br />
    </div>
  );
};

export default AddStudent;
