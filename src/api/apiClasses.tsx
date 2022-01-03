import axios from "axios";
import { useEffect } from "react";
import {IClass} from "../interfaces/Interface"

export const useGetAllClasses = async (setClasses: React.Dispatch<React.SetStateAction<IClass[]>>) :Promise<void> => {
    useEffect(() => {
        async function getClasses(){
            try{
                const {data} = await axios.get<IClass[]>(`http://localhost:8000/api/classes/getAll/Classes`);
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
                const {data} = await axios.get<{classId: number}[]>(`http://localhost:8000/api/classes/getAll/Classes`);
                setClassesIdList(data.map(cla=>cla.classId));
            }
            catch(err){
                console.error(err)
            }
        }
        getClassessId()
        
    },[])
}