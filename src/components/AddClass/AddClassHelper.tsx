import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IClass } from "../../interfaces/Interface";
import ThemeContext from "./../ThemeContext/ThemeContext";
import {useGetAllClassesId} from "../../api/apiClasses"

const [classesIdList, setClassesIdList] = useState<number[]>([]);
useGetAllClassesId(setClassesIdList);
const [nameError, setNameError] = useState<string>("");
const [classIdError, setClassIdError] = useState<string>("");
const [maxSeatsError, setMaxSeatsError] = useState<string>("");
const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);
const [addMessge, setAddMessge] = useState<string>("");

export const errors = [
    {   

    }
]
