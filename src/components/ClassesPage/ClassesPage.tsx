import Class from "../Class/Class";
import Styles from "./ClassPage.module.css";
import { useState } from "react";
import { IClass } from "../../interfaces/Interface";
import {useGetAllClasses} from "../../api/apiClasses"

const ClassPage = () => {
  const [classes, setClasses] =useState<IClass[]>([])
  useGetAllClasses(setClasses);
  return (
    <div >
      {classes.map((cla) => (
      <div style={{display:"inline-block"}}>
      <Class className={cla.name} outOf={+cla.maxSeats} placesLeft={+cla.currentCapacity} />
    </div>
      ))}
    </div>
    
  );
};
export default ClassPage;
