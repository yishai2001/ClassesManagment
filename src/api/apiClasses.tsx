import axios from "axios";
import { useEffect } from "react";
import {Class} from "../interfaces/Interface"

const apiurl='http://localhost:8000/api/classes';

export const useGetAllClasses = async (setClasses: React.Dispatch<React.SetStateAction<Class[]>>) :Promise<void> => {
    useEffect(() => {
        async function getClasses(){
            try{
                const {data} = await axios.get<Class[]>(`${apiurl}`);
                setClasses(data)
            }
            catch(err){
                console.error(err)
            }
        }
        getClasses()
    },[])
}

export const useGetAllClassesId = async (setClassesIdList: React.Dispatch<React.SetStateAction<number[]>>) :Promise<void> => {
    useEffect(() => {
        async function getClassessId(){
            try{
                const {data} = await axios.get<{classId: number}[]>(`${apiurl}`);
                setClassesIdList(data.map(cla=>cla.classId));
            }
            catch(err){
                console.error(err)
            }
        }
        getClassessId()
        
    },[])
}

export const addNewClass = async (newClass:Class) => {
    try {
        const resp = await axios.post<Class>(`${apiurl}/addClass`, newClass);
    } catch (err) {
        console.error(err);
    }
}


export const removeClass = async (id:number) => {
    try {
        await axios.delete<Class>(
          `${apiurl}/${id}`
        );
      } catch (err) {
        console.error(err);
      }
}
