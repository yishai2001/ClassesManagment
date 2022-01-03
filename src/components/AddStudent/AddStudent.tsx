import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IStudent } from "../../interfaces/Interface";
import { useContext } from "react";
import ThemeContext from "./../ThemeContext/ThemeContext";
import { useIdValidation } from "../../api/apiSudents";
import axios from "axios";

const AddStudent = () => {
  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: blueMode ? "#1976d2" : "#e73f3f",
  };

  const [newStudent, setNewStudent] = useState<IStudent>({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
    classId: null,
  });

  const [studentIdList, setStudentsIdList] = useState<string[]>([]);
  const [idError, setIdError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [professionError, setProfessionError] = useState<string>("");
  const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);
  const [addMessge, setAddMessge] = useState<string>("");

  //gets ids of the exsisting students
  useIdValidation(setStudentsIdList);
  //validetion after tried to submit once
  useEffect(() => {
    if (newStudent.id === "" && isClikedOnce)
      setIdError("please enter your first name");
    else setIdError("");

    if (newStudent.firstName === "" && isClikedOnce)
      setFirstNameError("please enter your first name");
    else setFirstNameError("");

    if (newStudent.lastName === "" && isClikedOnce)
      setLastNameError("please enter your last name");
    else setLastNameError("");

    if (newStudent.profession === "" && isClikedOnce)
      setProfessionError("please enter your profession");
    else setProfessionError("");
  }, [newStudent]);

  const hanleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });

    if (newStudent.id !== "" && !studentIdList.includes(newStudent.id))
      setFirstNameError("");
    if (newStudent.firstName !== "") setFirstNameError("");
    if (newStudent.lastName !== "") setLastNameError("");
    if (newStudent.profession !== "") setProfessionError("");
  };

  const validation = (): boolean => {
    let isValid = true;
    if (newStudent.id === "") {
      setIdError("please enter your id");
      isValid = false;
    } else if (newStudent.id.length !== 9) {
      setIdError("please enter a valid id with nine digits");
      isValid = false;
    } else if (studentIdList.includes(newStudent.id)) {
      setIdError("the id is already being used. please enter a diffrent id");
      isValid = false;
    }
    if (newStudent.firstName === "") {
      setFirstNameError("please enter your first name");
      isValid = false;
    }
    if (newStudent.lastName === "") {
      setLastNameError("please enter your last name");
      isValid = false;
    }
    if (newStudent.profession === "") {
      setProfessionError("please enter your profession");
      isValid = false;
    }
    return isValid;
  };

  const addStudent = async () => {
    try {
      const resp = await axios.post<IStudent>(
        `http://localhost:8000/api/students/addStudent`,
        newStudent
      );
      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const setDefaults = () => {
    setIsClickedOnce(false);
    setNewStudent({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      profession: "",
      classId: null,
    });
  };

  const HandleSubmit = (): void => {
    setIsClickedOnce(true);
    if (validation()) {
      setNewStudent(newStudent);
      setStudentsIdList((studentIdList) => [...studentIdList, newStudent.id]);
      addStudent();
      setDefaults();
      setAddMessge(
        `The student ${newStudent.firstName} ${newStudent.lastName} has been added successfully!`
      );
    } else setAddMessge("");
  };

  return (
    <div>
      <h1>Create a new student</h1>
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
            error={idError.length > 0}
            id="outlined-required"
            type="number"
            label="id"
            placeholder="id"
            helperText={idError}
            name="id"
            value={newStudent.id}
            onChange={(elenent) => hanleChanges(elenent)}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
          />
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
            id="outlined-required"
            label="age"
            placeholder="age"
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
            error={professionError.length > 0}
            id="outlined-required"
            label="profession"
            placeholder="profession"
            helperText={professionError}
            name="profession"
            value={newStudent.profession}
            onChange={(elenent) => hanleChanges(elenent)}
          />
        </div>
      </Box>
      <Button
        style={themeStyles}
        variant="contained"
        onClick={() => HandleSubmit()}
      >
        add
      </Button>
      <br />
      <span style={{ color: "green" }}>{addMessge}</span>
    </div>
  );
};

export default AddStudent;
