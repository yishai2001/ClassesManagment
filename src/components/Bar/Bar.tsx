import React, { useContext} from "react";
import { Routes as Switch, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ThemeContext from "../ThemeContext/ThemeContext";
import ListBar from "../ListBar/ListBar";

const Bar = (props:{changeColor: () => void}) => {

  const {changeColor} = props;
  const navigate = useNavigate();

  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    backgroundColor: blueMode,
    height: 85
  };

  //menu

  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(!state);
    };

  return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar style={themeStyles}>
              <IconButton
                onClick={toggleDrawer}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                style={{ marginRight: 20, fontSize:23 }}
              >
                Shob Classes
              </Typography>
              <IconButton
                onClick={changeColor}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <LoyaltyIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <div>
        <ListBar toggleDrawer={toggleDrawer} state={state}/>
        </div>

      </div>
  );
}

export default Bar;
