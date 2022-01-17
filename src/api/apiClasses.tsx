import axios from "axios";
import { useEffect } from "react";
import {IClass} from "../interfaces/Interface"

export const useGetAllClasses = async (setClasses: React.Dispatch<React.SetStateAction<IClass[]>>) :Promise<void> => {
    useEffect(() => {
        async function getClasses(){
            try{
                const {data} = await axios.get<IClass[]>(`http://localhost:8000/api/classes/`);
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
                const {data} = await axios.get<{classId: number}[]>(`http://localhost:8000/api/classes/`);
                setClassesIdList(data.map(cla=>cla.classId));
            }
            catch(err){
                console.error(err)
            }
        }
        getClassessId()
        
    },[])
}

export const addNewClass = async (newClass:IClass) => {
    try {
        const resp = await axios.post<IClass>(`http://localhost:8000/api/classes/addClass`, newClass);
    } catch (err) {
        console.error(err);
    }
}


export const removeClass = async (id:number) => {
    try {
        await axios.delete<IClass>(
          `http://localhost:8000/api/classes/${id}`
        );
      } catch (err) {
        console.error(err);
      }
}
