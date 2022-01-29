import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { Class } from "../../interfaces/Interface";
import { useGetAllClasses, removeClass } from "../../api/apiClasses";
import { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const ClassPage = () => {

  const [classes, setClasses] = useState<Class[]>([]);
  useGetAllClasses(setClasses);

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    color: blueMode,
    borderColor: blueMode ,
    marginTop: 20
  };

  const grey = {
    color: "#cccccc",
    borderColor: "#cccccc",
    marginTop: 20,
  };

  const isDisabled = (condition:boolean) => {
    if (condition) return grey;
    else return themeStyles;
  };

  const deleteClass = async (id: number) => {
      removeClass(id)
      const newlist = classes.filter((deleted) => {
        return deleted.classId !== id;
      });
      setClasses(newlist);
  };

  return (
    <Grid container>
        <Grid item xs={12}>
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
              style={isDisabled(+cla.currentCapacity>0)}
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
              style={isDisabled((+cla.maxSeats - +cla.currentCapacity)===+cla.maxSeats)}
              size="small"
              variant="outlined"
              >
              GO TO {cla.name} CLASS
            </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
    </Grid>
    </Grid>
  );
};

export default ClassPage;
