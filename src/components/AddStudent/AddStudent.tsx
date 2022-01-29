import React, { useState} from "react";
import {fields} from "./AddStudentHelper"
import { clearErrors} from "../Fields/FieldsHelper"
import Form from "../Form/Form";
import { Student, field } from "../../interfaces/Interface";
import {useGetAllStudentsId, addNewStudent} from "../../api/apiSudents"
import Grid from "@mui/material/Grid";

const AddStudent = () => {

  const [newStudent, setNewStudent] = useState<Student>({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
    classId: null,
  });

  const [studentsIdList, setStudentsIdList] = useState<number[]>([]);
  const [fieldsList, setFieldsList] = useState<field[]>(fields);
  useGetAllStudentsId(setStudentsIdList);
  const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);
  const [addMessge, setAddMessge] = useState<string>("");

  const hanleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    fields.filter(field => {//ישי האפססס
      if (field.classValue === e.target.name)
        field.value = e.target.value;
    })
    setFieldsList(fields);
    if (isClikedOnce) {
      clearErrors(fieldsList);
    }
      
  };
  
  const handleSubmit = (): void => {
    if (!isClikedOnce) setIsClickedOnce(true);
    addNewStudent(newStudent);
    setStudentsIdList(studentsIdList => [...studentsIdList, +newStudent?.id])
    setDefaults();
    setAddMessge(`The class ${newStudent.firstName} ${newStudent.lastName} has been added successfully!`)
  };

  const setDefaults = () =>{
    setIsClickedOnce(false);
    setNewStudent({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      profession: "",
      classId: null});
    fields.filter(field => {
      field.value="";
    })
    setFieldsList(fields);
  }

  return (
    <div> 
      <Grid item container direction="column" xs={12}>
      <h1>Create a new student</h1>
      <Form 
      fields={fieldsList} 
      hanleChanges={hanleChanges} 
      handleSubmit={handleSubmit} 
      addMessege={addMessge} 
      idList={studentsIdList} 
      setIsClickedOnce={setIsClickedOnce}
      setFieldsList={setFieldsList}/>
      <br />
      </Grid>
    </div>
  );
};

 export default AddStudent;
