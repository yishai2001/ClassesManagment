import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import ThemeContext from "../ThemeContext/ThemeContext";
import { IClass } from "../../interfaces/Interface";
import { useGetAllClasses } from "../../api/apiClasses";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClassPage = () => {

  const [classes, setClasses] = useState<IClass[]>([]);
  useGetAllClasses(setClasses);
  console.log(classes)

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    color: blueMode ? "#1976d2" : "#e73f3f",
    borderColor: blueMode ? "#1976d2" : "#e73f3f",
    marginTop: 20
  };

  const grey = {
    color: "#cccccc",
    borderColor: "#cccccc",
    marginTop: 20,
  };

  const isDisabled = (seats: number) => {
    if (seats > 0) return grey;
    else return themeStyles;
  };

  const isDisabledPlaces = (condition:boolean) => {
    if (condition) return grey;
    else return themeStyles;
  };

  const deleteClass = async (id: number) => {
    try {
      await axios.delete<IClass>(
        `http://localhost:8000/api/classes/remove/Classes/${id}`
      );
      const newlist = classes.filter((deleted) => {
        return deleted.classId !== id;
      });
      setClasses(newlist);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex" , flexWrap:"wrap" }}>
      {classes.map((cla) => (
        <Card key={cla.classId} style={{ margin: 30, padding: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {cla.name}
            </Typography>
            <Typography variant="body2">
              places left: {+cla.maxSeats - +cla.currentCapacity}
            </Typography>
            <Typography color="text.secondary">
              out of {cla.maxSeats}
            </Typography>
            <Button
              style={isDisabled(+cla.currentCapacity)}
              disabled={cla.currentCapacity > 0}
              size="small"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => deleteClass(+cla.classId)}>
              DELETE CLASS
            </Button>
            <br/>
            <Link style={{ textDecoration: 'none' }} to={`/StudentOfClass/${cla.classId}`}>
            <Button
              style={isDisabledPlaces((+cla.maxSeats - +cla.currentCapacity)===+cla.maxSeats)}
              size="small"
              variant="outlined"
              onClick={() => <Link to={`/StudentOfClass/${cla.classId}`}/>}
              >
              GO TO {cla.name} CLASS
            </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClassPage;
