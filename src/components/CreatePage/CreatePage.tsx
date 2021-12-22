import { useState } from "react";
import {IStudent} from '../../interfaces/Interface'
import AddStudent from "../AddStudent/AddStudent";

const CreatePage=()=>{

    const [student,setSudent]= useState<IStudent>();

    return (
        <div style={{display:"flex"}}>
        <AddStudent/>
      </div>
      )
 }
 export default CreatePage;