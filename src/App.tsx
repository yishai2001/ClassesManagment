import { useState } from "react";
import { Route, Routes as Switch, useNavigate } from "react-router-dom";
import "./App.css"
import Bar from "./components/Bar/Bar";
import ThemeContext from "./components/ThemeContext/ThemeContext";
import {routes, red, blue} from "./AppHelper"
import Grid from '@mui/material/Grid';

const App = () => {
 
  //context blue/red mode
  const [blueMode, setBlueMode] = useState<string>(blue);

  const changeColor = (): void => {
    blueMode === blue ? setBlueMode(red) : setBlueMode(blue);
  };

  return (
    <div>
      <ThemeContext.Provider value={blueMode}>
      <Grid container>
        <Grid item xs={12}>
          <Bar changeColor={changeColor}/>
            <div style={{ padding: 50, display: "flex" }}>
              <Switch>
                {routes.map(({path, element}, key) =>
                <Route path={path} element={element} key={key} />)}
              </Switch>
            </div>
        </Grid>
      </Grid>
      <footer className="copyRight">
        <p>&copy;YishaiC</p>
      </footer>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
