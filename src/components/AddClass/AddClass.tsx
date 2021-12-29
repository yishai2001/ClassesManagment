import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IClass } from "../../interfaces/Interface";
import ThemeContext from "./../ThemeContext/ThemeContext";

const AddClass = () => {
  const [newClass, setNewClass] = useState<IClass>({
    classId: 0,
    name: "",
    maxSeats: "",
    currentCapacity: 0
  });

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: blueMode ? "#1976d2" : "#e73f3f",
  };

  const [nameError, setNameError] = useState<string>("");
  const [classIdError, setClassIdError] = useState<string>("");
  const [maxSeatsError, setMaxSeatsError] = useState<string>("");
  const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);

  //validetion after tried to submit once
  useEffect(() => {

    if (newClass.classId === "" && isClikedOnce) 
      setClassIdError("please enter the class name");
    else setClassIdError("");

    if (newClass.name === "" && isClikedOnce) 
      setNameError("please enter the class name");
    else setNameError("");

    if (newClass.maxSeats === "" && isClikedOnce)
      setMaxSeatsError("please enter max seats");
    else setMaxSeatsError("");

  }, [newClass]);

  const hanleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const validation = (): boolean => {
    if (newClass.classId === "") 
      setClassIdError("please enter the class name");
    if (newClass.name === "") 
      setNameError("please enter the class name");
    if (newClass.maxSeats === "")
      setMaxSeatsError("please enter max seats");
    return (newClass.name !== "" && newClass.maxSeats !== "" && newClass.classId!== "")
  }
  const handleSubmit = (): void => {
    if (!isClikedOnce) setIsClickedOnce(true);
    if (validation())
      console.log(newClass);
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
        width="200px"
      ><TextField
          required
          error={classIdError.length > 0}
          id="outlined-required"
          label="classId"
          placeholder="classId"
          helperText={classIdError}
          name="classId"
          value={newClass.classId}
          onChange={(elenent) => hanleChanges(elenent)}
        />
        <TextField
          required
          error={nameError.length > 0}
          id="outlined-required"
          label="name"
          placeholder="name"
          helperText={nameError}
          name="name"
          value={newClass.name}
          onChange={(elenent) => hanleChanges(elenent)}
        />
        <TextField
          required
          error={maxSeatsError.length > 0}
          id="outlined-required"
          label="max seats"
          placeholder="max seats"
          type="number"
          helperText={maxSeatsError}
          name="maxSeats"
          value={newClass.maxSeats}
          onChange={(elenent) => hanleChanges(elenent)}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
        />
        <Button
          style={themeStyles}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          add
        </Button>
      </Box>
      <br />
    </div>
  );
};

export default AddClass;
