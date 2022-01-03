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
import { IStudent, IClass } from "../../interfaces/Interface";
import { useContext, useState } from "react";
import { useGetAllStudents } from "../../api/apiSudents";
import ThemeContext from "./../ThemeContext/ThemeContext";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useGetAllClasses} from "../../api/apiClasses"
import ClassMenu from "../ClassMenu/ClassMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 17,
    textAlign: "center",
  },
}));

const StudentPage = () => {

  const [classList, setClassList] = useState<IClass[]>([]);
  useGetAllClasses(setClassList);

  const [students, setStudents] = useState<IStudent[]>([]);
  useGetAllStudents(setStudents);
  console.log(students);

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    color: blueMode ? "#1976d2" : "#e73f3f",
    borderColor: blueMode ? "#1976d2" : "#e73f3f",
  };
  const classes = useStyles();

  const deleteStudent = async (id: string) => {
    try {
      await axios.delete<IStudent>(
        `http://localhost:8000/api/students/delete/${id}`
      );
      const newlist = students.filter((deleted) => {
        return deleted.id !== id;
      });
      setStudents(newlist);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStudent = async (id: string, classId: number) => {
    try {
      await axios.put<IStudent>(
        `http://localhost:8000/api/students/update/${id}/${classId}`
      );
      // students.map((updated) => {
      //   if (updated.id===id)
      //     updated.classId=classId;
      // });
      // setClassMenu(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.root}>
              <b>ID</b>
            </TableCell>
            <TableCell className={classes.root}>
              <b>First Name</b>
            </TableCell>
            <TableCell className={classes.root}>
              <b>Last Name</b>
            </TableCell>
            <TableCell className={classes.root}>
              <b>Age</b>
            </TableCell>
            <TableCell className={classes.root}>
              <b>Profession</b>
            </TableCell>
            <TableCell className={classes.root}>
              <b>Assign</b>
            </TableCell>
            <TableCell className={classes.root}>
              <b>Delete</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              className={classes.root}
              key={student.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className={classes.root} component="th" scope="row">
                {student.id}
              </TableCell>
              <TableCell className={classes.root}>
                {student.firstName}
              </TableCell>
              <TableCell className={classes.root}>{student.lastName}</TableCell>
              <TableCell className={classes.root}>{student.age}</TableCell>
              <TableCell className={classes.root}>
                {student.profession}
              </TableCell>
              <TableCell className={classes.root}>
                {/* <Button onClick={handleClick} style={themeStyles} variant="outlined">
                  ASSING TO CLASS
                </Button> */}
                {/* <Menu
                  id="basic-menu"
                  key={student.id}
                  anchorEl={classMenu}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                {menuHandler(student)}
                </Menu>
                {menuHandler(student)} */}
                <ClassMenu stu={student} students={students} setClassList={setClassList} classList={classList}/>
              </TableCell>
              <TableCell className={classes.root}>
                <Button
                  style={themeStyles}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteStudent(student.id)}
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
