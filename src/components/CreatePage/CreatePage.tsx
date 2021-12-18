import { useState } from "react";


interface IStudent{
    ID:number
    firstName:string
    lastName:string
    age:number
    education:string
}
const CreatePage=()=>{

    const [student,setSudent]= useState<IStudent>();

    return (
        <div >
        CreatePage
      </div>
      )
 }
 export default CreatePage;