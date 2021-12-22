import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

interface Props {
  className: string;
  placesLeft: number;
  outOf: number;
}

const Classes: React.FC<Props> = ({ className, placesLeft, outOf }) => {
  return (
    <Card style={{margin:10}}>
      <CardContent >
        <Typography variant="h5" component="div">
          {className}
        </Typography>
        <Typography variant="body2">places left: {placesLeft}</Typography>
        <Typography color="text.secondary">out of {outOf}</Typography>
        <Button size="small">delete class</Button>
      </CardContent>
    </Card>
  );
};

export default Classes;
