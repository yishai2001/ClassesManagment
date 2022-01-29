import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Student, Class } from "../../interfaces/Interface";
import { useContext, useState } from "react";
import { useGetAllStudents } from "../../api/apiSudents";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import {useGetAllClasses} from "../../api/apiClasses"
import {removeStudent} from "../../api/apiSudents"
import ClassMenu from "../../components/ClassMenu/ClassMenu";
import {headers} from "./StudentPageHelper"

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 17,
    textAlign: "center",
  },
}));

const StudentPage = () => {

  const [classList, setClassList] = useState<Class[]>([]);
  useGetAllClasses(setClassList);

  const [students, setStudents] = useState<Student[]>([]);
  useGetAllStudents(setStudents);

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    color: blueMode ,
    borderColor: blueMode ,
  };
  const classes = useStyles();

  const deleteStudent = async (student: Student) => {
      removeStudent(student.id);
      const newlist = students.filter((deleted) => {
        return deleted.id !== student.id;
      });
      setStudents(newlist);
      classList.map((newClass) => {
        if (newClass.classId === student.classId){
            newClass.currentCapacity= (+newClass.currentCapacity) -1;
        }
    })
  };

  const createTableCell = (key: string,value: any) => {
    return (
      <TableCell key={key} className={classes.root}>
          {value}
      </TableCell>
    );
  }

  const fieldsStudent= (student: Student) : JSX.Element[]=>{
    let tableCells=[]
    for (let [key, value] of Object.entries(student))
    if (key!=="classId" && key!== "image" && key!== "createdAt" && key!=="updatedAt") {
      console.log(`${key}: ${value}`);
      tableCells.push(createTableCell(key, value));
    }
    return tableCells
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, key)=>(
            <TableCell key={key} className={classes.root}>
            <b>{header}</b>
            </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, key) => (
            <TableRow
              className={classes.root}
              key={student.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {fieldsStudent(student)}
              <TableCell className={classes.root}>
                <ClassMenu stu={student} students={students} setClassList={setClassList} classList={classList}/>
              </TableCell>
              <TableCell className={classes.root}>
                <Button
                  style={themeStyles}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteStudent(student)}
                >
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentPage;
