import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IClass } from "../../interfaces/Interface";
import ThemeContext from "./../ThemeContext/ThemeContext";
import axios from "axios";
import {useGetAllClassesId} from "../../api/apiClasses"

const AddClass = () => {
  const [newClass, setNewClass] = useState<IClass>({
    classId: "",
    name: "",
    maxSeats: "",
    currentCapacity: 0
  });

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: blueMode ? "#1976d2" : "#e73f3f",
  };

  const [classesIdList, setClassesIdList] = useState<number[]>([]);
  useGetAllClassesId(setClassesIdList);
  const [nameError, setNameError] = useState<string>("");
  const [classIdError, setClassIdError] = useState<string>("");
  const [maxSeatsError, setMaxSeatsError] = useState<string>("");
  const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);
  const [addMessge, setAddMessge] = useState<string>("");

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
    let isValid = true;
    if (newClass.classId === "") {
      setClassIdError("please enter the class id");
      isValid = false;
    }
    else if (classesIdList.includes(+newClass.classId)){
      setClassIdError("the id is already being used. please enter a diffrent id");
      isValid = false;
    }
    if (newClass.name === ""){
      setNameError("please enter the class name");
      isValid = false;
    }
    if (newClass.maxSeats === ""){
      setMaxSeatsError("please enter the class max seats");
      isValid = false;
    }
    else
      if (+newClass.maxSeats <= 0){
      setMaxSeatsError("please enter a valid number of seats");
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = (): void => {
    if (!isClikedOnce) setIsClickedOnce(true);
    if (validation()){
      setNewClass(newClass);
      console.log(newClass);
      setClassesIdList(classesIdList => [...classesIdList, +newClass.classId])
      addClass();
      setDefaults();
      setAddMessge(`The class ${newClass.name} has been added successfully!`)
    }
    else
      setAddMessge("");
  };

  const addClass = async () => {
    try {
        const resp = await axios.post<IClass>(`http://localhost:8000/api/classes/addClass`, newClass);
        console.log(resp.data);
    } catch (err) {
        console.error(err);
    }
  };

  const setDefaults = () =>{
    setIsClickedOnce(false);
    setNewClass({
    classId: "",
    name: "",
    maxSeats: "",
    currentCapacity: 0});
  }

  return (
    <div>
      <h1>Create a new class</h1>
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
          type="number"
          id="outlined-required"
          label="classId"
          placeholder="classId"
          helperText={classIdError}
          name="classId"
          value={newClass.classId}
          onChange={(elenent) => hanleChanges(elenent)}
          onKeyDown={(e) =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
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
        <br/>
        <span style={{color:'green'}}>{addMessge}</span>
      </Box>
      <br />
    </div>
  );
};

export default AddClass;
