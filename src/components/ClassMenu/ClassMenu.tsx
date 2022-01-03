import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IClass, IStudent } from "../../interfaces/Interface";
import { useContext, useState } from "react";
import { useGetAllClasses } from "../../api/apiClasses";
import { updateStudent } from "../../api/apiSudents";
import Button from "@mui/material/Button";
import ThemeContext from "./../ThemeContext/ThemeContext";

const ClassMenu=(props:{ stu: IStudent; students:IStudent[]; setClassList:React.Dispatch<React.SetStateAction<IClass[]>>; classList:IClass[]})=>{

    //blueMode
    const blueMode = useContext(ThemeContext);
    const themeStyles = {
        color: blueMode ? "#1976d2" : "#e73f3f",
        borderColor: blueMode ? "#1976d2" : "#e73f3f",
    };

    const {stu, students, classList, setClassList}= props;
    //const [classList, setClassList] = useState<IClass[]>([]);
    useGetAllClasses(setClassList);

      //menu hadler
    const [classMenu, setClassMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(classMenu);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setClassMenu(event.currentTarget);
    };
    const handleClose = () => {
        setClassMenu(null);
    };

    const menuHandler= (student: IStudent) =>{
        return(
          classList.map((cla) => 
            classDefine(student, cla)
          )
        );
    }
    
    const handleUpdate = (student:IStudent, cla:IClass) => {
        console.log(student)
        if (student.classId !== null){
            classList.map((oldClass) => {
            if (oldClass.classId === student.classId){
                oldClass.currentCapacity= (+oldClass.currentCapacity)-1;
                console.log(oldClass);
            }
        })
        }
        updateStudent(student.id, +cla.classId);
        students.map((updated) => {
          if (updated.id === student.id){
            updated.classId=+cla.classId;
          }
        });
        classList.map((newClass) => {
            if (newClass.classId === student.classId){
                newClass.currentCapacity= (+newClass.currentCapacity) +1;
                console.log(newClass)
            }
        })
        hi=menuHandler(stu);
        setClassMenu(null);
    }
    
    
        const classDefine = (student: IStudent, cla: IClass) =>{
          if (student.classId!== cla.classId && cla.currentCapacity < cla.maxSeats){
            return (
              <MenuItem key={cla.classId} onClick={() => handleUpdate(student, cla)}>
                {cla.name}
              </MenuItem>
            )
          } 
          else if (student.classId!== cla.classId && cla.currentCapacity >= cla.maxSeats){
            return (
              <MenuItem key={cla.classId} disabled>
              {cla.name}
              </MenuItem>
            )
          }
          else {
            return (
              <MenuItem key={cla.classId} disabled style={{backgroundColor:"yellowgreen"}}>
                {cla.name}
              </MenuItem>
            )
          } 
          }
    let hi=menuHandler(stu);

    return (
        <div>
            <Button onClick={handleClick} style={themeStyles} variant="outlined">
                  ASSING TO CLASS
            </Button>
            <Menu
                  id="basic-menu"
                  key={stu.id}
                  anchorEl={classMenu}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                {hi}
            </Menu>
        </div>
    )
}

export default ClassMenu