import axios from "axios";
import { useEffect } from "react";
import {IStudent} from "../interfaces/Interface"

export const useGetAllStudents = async (setStudents: React.Dispatch<React.SetStateAction<IStudent[]>>) :Promise<void> => {
    useEffect(() => {
        async function getStudents(){
            try{
                const {data} = await axios.get<IStudent[]>(`http://localhost:8000/api/students/allStudents`);
                setStudents(data)
            }
            catch(err){
                console.error(err)
            }
        }
        getStudents()
    },[])
}