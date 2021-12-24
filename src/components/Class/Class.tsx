import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext} from "react"
import ThemeContext from "./../ThemeContext/ThemeContext"

interface Props {
  className: string;
  placesLeft: number;
  outOf: number;
}

const Classes: React.FC<Props> = ({ className, placesLeft, outOf }) => {
  
//blueMode
const blueMode = useContext(ThemeContext);
const themeStyles = {
  color: blueMode? "#1976d2" : "#e73f3f",
  borderColor: blueMode? "#1976d2" : "#e73f3f",
  marginTop:20
}
 
return (
    <Card style={{margin:10, padding:10}}>
      <CardContent >
        <Typography variant="h5" component="div">
          {className}
        </Typography>
        <Typography variant="body2">places left: {placesLeft}</Typography>
        <Typography color="text.secondary">out of {outOf}</Typography>
        <Button style={themeStyles} size="small" variant="outlined" startIcon={<DeleteIcon />}>DELETE CLASS</Button>
      </CardContent>
    </Card>
  );
};

export default Classes;
