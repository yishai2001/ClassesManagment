import axios from "axios";
import { useEffect } from "react";
import {IClass} from "../interfaces/Interface"

export const useGetAllClasses = async (setClasses: React.Dispatch<React.SetStateAction<IClass[]>>) :Promise<void> => {
    useEffect(() => {
        async function getClasses(){
            try{
                const {data} = await axios.get<IClass[]>(`http://localhost:8000/api/classes/allClasses`);
                setClasses(data)
            }
            catch(err){
                console.error(err)
            }
        }
        getClasses()
    },[])
}