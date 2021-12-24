import { useState } from "react";
import {IStudent} from '../../interfaces/Interface'
import AddClass from "../AddClass/AddClass";
import AddStudent from "../AddStudent/AddStudent";
import Styles from './CreatePage.module.css'

const CreatePage=()=>{

    const [student,setSudent]= useState<IStudent>();

    return (
        <div className={Styles.body}>
        <AddStudent/>
        <AddClass/>
      </div>
      )
 }
 export default CreatePage;