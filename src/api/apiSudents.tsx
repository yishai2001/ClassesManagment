import axios from "axios";
import { useEffect } from "react";
import {Student} from "../interfaces/Interface"

const apiurl='http://localhost:8000/api/students';

export const useGetAllStudents = async (setStudents: React.Dispatch<React.SetStateAction<Student[]>>) :Promise<void> => {
    useEffect(() => {
        async function getStudents(){
            try{
                const {data} = await axios.get<Student[]>(`${apiurl}`);
                setStudents(data)
            }
            catch(err){
                console.error(err)
            }
        }
        getStudents()
    },[])
}

//returns only the id
export const useGetAllStudentsId = async (setStudentsIdList: React.Dispatch<React.SetStateAction<number[]>>) :Promise<void> => {
    useEffect(() => {
        async function getStudentsId(){
            try{
                const {data} = await axios.get<{id: number}[]>(`${apiurl}`);
                setStudentsIdList(data.map(student=>student.id));
            }
            catch(err){
                console.error(err)
            }
        }
        getStudentsId()
        
    },[])
}

//adds a student
export const useAddStudent = async (student:Student) :Promise<void> => {
    useEffect(() => {
        async function getStudentsId(){
            try{
                await axios.post<{id: string}[]>(`${apiurl}/addStudent`, student);
            }
            catch(err){
                console.error(err)
            }
        }
        getStudentsId()
        
    },[])
}

export const updateStudent = async (id: string, classId: number) => {
    try {
      await axios.put<Student>(
        `${apiurl}/update/${id}/${classId}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  export const useFetStudentsOfClass = async (setStudents: React.Dispatch<React.SetStateAction<Student[]>>, classId:string | undefined) :Promise<void> => {
    useEffect(() => {
        async function getStudents(){
            try{
                const {data} = await axios.get<Student[]>(`${apiurl}/getClassesStudents/${classId}`);
                setStudents(data)
            }
            catch(err){
                console.error(err)
            }
        }
        getStudents()
    },[])
}

export const addNewStudent = async (newStudent:Student) => {
    try {
        const resp = await axios.post<Student>(
          `${apiurl}/addStudent`,
          newStudent
        );
      } catch (err) {
        console.error(err);
      }
}

export const updateClassToNull = async (id: string) => {
    try {
      await axios.put<Student>(
        `${apiurl}/updateStudentClassToNull/${id}`
      );
    } catch (err) {
      console.error(err);
    }
  };

 export const removeStudent = async (id: string) => {
    try {
      await axios.delete<Student>(
        `${apiurl}/students/${id}`
      );
    } catch (err) {
      console.error(err);
    }
  };