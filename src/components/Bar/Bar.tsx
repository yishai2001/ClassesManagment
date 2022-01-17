import React, { useState } from "react";
import { Route, Routes as Switch, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import List from "@mui/material/List";
import ThemeContext from "../ThemeContext/ThemeContext";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import {routes} from "../../AppHelper"

const Bar = () => {
  const navigate = useNavigate();

  //context blue/red mode
  const [blueMode, setBlueMode] = useState<boolean>(true);

  const changeColor = (): void => {
    setBlueMode(!blueMode);
  };

  const themeStyles = {
    backgroundColor: blueMode ? "#1976d2" : "#e73f3f",
    height: 85
  };

  //menu
  type Anchor = "left";

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
    
  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        {routes.map(({path, name}, key) =>
        <ListItem  key={key} style={{fontSize:20}} onClick={() => navigate(path)}>{name}</ListItem>)}
      </List>
    </Box>
  );

  return (
      <div>
        <ThemeContext.Provider value={blueMode}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar style={themeStyles}>
              <IconButton
                onClick={toggleDrawer("left", true)}
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
          <div>
              <React.Fragment key={"left"}>
                <Drawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  {list()}
                </Drawer>
              </React.Fragment>
          </div>
        </div>
        <div style={{ padding: 50, display: "flex" }}>
          <Switch>
          {routes.map(({path, element}, key) =>
           <Route path={path} element={element} key={key} />)}
          </Switch>
        </div>
        </ThemeContext.Provider>
      </div>
  );
}

export default Bar;
