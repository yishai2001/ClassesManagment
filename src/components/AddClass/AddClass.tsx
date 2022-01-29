import React, { useState } from "react";
import {fields} from "./AddClassHelper"
import {validation, clearErrors} from "../Fields/FieldsHelper"
import Form from "../Form/Form";
import { Class, field } from "../../interfaces/Interface";
import {useGetAllClassesId, addNewClass} from "../../api/apiClasses"

const AddClass = () => {

  const [newClass, setNewClass] = useState<Class>({
    classId: "",
    name: "",
    maxSeats: "",
    currentCapacity: 0
  });

  const [classesIdList, setClassesIdList] = useState<number[]>([]);
  const [fieldsList, setFieldsList] = useState<field[]>(fields);
  useGetAllClassesId(setClassesIdList);
  const [isClikedOnce, setIsClickedOnce] = useState<boolean>(false);
  const [addMessge, setAddMessge] = useState<string>("");

  const hanleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
    fields.filter(field => {
      if (field.classValue === e.target.name)
        field.value = e.target.value;
    })
    setFieldsList(fields);
    if (isClikedOnce) {
      clearErrors(fields);
    }
  };
  
  const handleSubmit = (): void => {
    validation(fields, classesIdList)
    setFieldsList(fields);
    if (!isClikedOnce) setIsClickedOnce(true);
    addNewClass(newClass);
    setClassesIdList(classesIdList => [...classesIdList, +newClass?.classId])
    setDefaults();
    setAddMessge(`The class ${newClass.name} has been added successfully!`)
  };

  const setDefaults = () =>{
    setIsClickedOnce(false);
    setNewClass({
    classId: "",
    name: "",
    maxSeats: "",
    currentCapacity: 0});
    fields.filter(field => {
      field.value="";
    })
    setFieldsList(fields);
  }

  return (
    <div>
      <h1>Create a new class</h1>
      <Form 
      fields={fieldsList} 
      hanleChanges={hanleChanges} 
      handleSubmit={handleSubmit} 
      addMessege={addMessge} 
      idList={classesIdList} 
      setIsClickedOnce={setIsClickedOnce}
      setFieldsList={setFieldsList}/>
      <br />
    </div>
  );
};
export default AddClass;
