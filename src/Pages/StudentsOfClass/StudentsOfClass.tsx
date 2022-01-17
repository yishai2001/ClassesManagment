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
import { IStudent } from "../../interfaces/Interface";
import { useContext, useState } from "react";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { useFetStudentsOfClass, updateClassToNull } from "../../api/apiSudents";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 17,
    textAlign: "center",
  },
}));

const StudentsOfClass = () => {

    const { classId } = useParams();
    console.log(classId)
    const [students, setStudents] = useState<IStudent[]>([]);
    useFetStudentsOfClass(setStudents, classId);
    console.log(students);

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    color: blueMode ? "#1976d2" : "#e73f3f",
    borderColor: blueMode ? "#1976d2" : "#e73f3f",
  };
  const classes = useStyles();

  const updateStudent = async (id: string) => {
      updateClassToNull(id);
      const newlist = students.filter((deleted) => {
        return deleted.id !== id;
      });
      setStudents(newlist);
  };

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
                <Button
                  style={themeStyles}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => updateStudent(student.id)}
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

export default StudentsOfClass;
