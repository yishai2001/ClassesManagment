import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";
import { makeStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import {useContext} from "react"
import ThemeContext from "./../ThemeContext/ThemeContext"

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 17,
    textAlign:"center"
  },
}));

const StudentPage = () => {

//blueMode
const blueMode = useContext(ThemeContext);
const themeStyles = {
  color: blueMode? "#1976d2" : "#e73f3f",
  borderColor: blueMode? "#1976d2" : "#e73f3f",
}
  const classes=useStyles();

  function createData(
    id: number,
    fName: string,
    lName: string,
    age: number,
    profession: string
  ) {
    return { id, fName, lName, age, profession };
  }

  const rows = [
    createData(1, "my", "name", 6, "kaki"),
    createData(2, "yishai", "cohen", 20, "programer"),
    createData(3, "ליבי", "חביבי", 6, "דה"),
    createData(4, "ש", "ד", 6, "ג"),
  ];

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="simple table"  >
        <TableHead>
          <TableRow>
            <TableCell className={classes.root} ><b>ID</b></TableCell>
            <TableCell className={classes.root}><b>First Name</b></TableCell>
            <TableCell className={classes.root}><b>Last Name</b></TableCell>
            <TableCell className={classes.root}><b>Age</b></TableCell>
            <TableCell className={classes.root}><b>Profession</b></TableCell>
            <TableCell className={classes.root}><b>Assign</b></TableCell>
            <TableCell className={classes.root}><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow className={classes.root}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className={classes.root} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell className={classes.root}>{row.fName}</TableCell>
              <TableCell className={classes.root}>{row.lName}</TableCell>
              <TableCell className={classes.root}>{row.age}</TableCell>
              <TableCell className={classes.root}>{row.profession}</TableCell>
              <TableCell className={classes.root}>
                <Button style={themeStyles} variant="outlined">ASSING TO CLASS</Button>
              </TableCell>
              <TableCell className={classes.root}>
                <Button  style={themeStyles} variant="outlined" startIcon={<DeleteIcon/>}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentPage;
