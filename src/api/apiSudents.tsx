import axios from "axios";
import { useEffect } from "react";
import {IStudent} from "../interfaces/Interface"

const apiurl='http://localhost:8000/api/students';

export const useGetAllStudents = async (setStudents: React.Dispatch<React.SetStateAction<IStudent[]>>) :Promise<void> => {
    useEffect(() => {
        async function getStudents(){
            try{
                const {data} = await axios.get<IStudent[]>(`${apiurl}/getAll/Students`);
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
export const useIdValidation = async (setStudentsIdList: React.Dispatch<React.SetStateAction<string[]>>) :Promise<void> => {
    useEffect(() => {
        async function getStudentsId(){
            try{
                const {data} = await axios.get<{id: string}[]>(`${apiurl}/getAll/Students`);
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
export const useAddStudent = async (student:IStudent) :Promise<void> => {
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
      await axios.put<IStudent>(
        `${apiurl}/update/${id}/${classId}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  export const useFetStudentsOfClass = async (setStudents: React.Dispatch<React.SetStateAction<IStudent[]>>, classId:string | undefined) :Promise<void> => {
    useEffect(() => {
        async function getStudents(){
            try{
                const {data} = await axios.get<IStudent[]>(`${apiurl}/getClassesStudents/${classId}`);
                setStudents(data)
            }
            catch(err){
                console.error(err)
            }
        }
        getStudents()
    },[])
}