import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props{
  className: string;
  placesLeft: number;
  outOf: number;
}

const Classes: React.FC<Props> = ({className, placesLeft, outOf}) =>{
    return (
      <Card >
      <CardContent style={{ margin: 20 }}>
          <div style={{ justifyContent:'space-between', display: 'flex'  }}>
          <h1 style={{fontSize:35}}>{className}</h1>
          </div >
          <Typography variant="body2">
            places left: {placesLeft}
          </Typography>
          <Typography color="text.secondary" style={{marginTop:-25}}>
          <h3>out of {outOf}</h3>
          </Typography>
      </CardContent>
  </Card>
      );
}
    
export default Classes;