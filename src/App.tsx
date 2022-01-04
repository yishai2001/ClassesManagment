import React, { useState } from "react";
import ClassPage from "./components/ClassPage/ClassPage";
import StudentPage from "./components/StudentsPage/StudentPage";
import CreatePage from "./components/CreatePage/CreatePage";
import { Route, Routes as Switch, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ThemeContext from "./components/ThemeContext/ThemeContext";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import "./App.css";
import StudentsOfClass from "./components/StudentsOfClass/StudentsOfClass";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";

function App() {
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
        <ListItem style={{fontSize:20}} onClick={() => navigate("/")}>Class Student</ListItem>
        <ListItem style={{fontSize:20}} onClick={() => navigate("/StudentPage")}>
          Student Page
        </ListItem>
        <ListItem style={{fontSize:20}} onClick={() => navigate("/CreatePage")}>Create Page</ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeContext.Provider value={blueMode}>
      <div>
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
            <Route path="/" element={<ClassPage />} />
            <Route path="/StudentPage" element={<StudentPage />} />
            <Route path="/CreatePage" element={<CreatePage />} />
            <Route
              path="/StudentOfClass/:classId"
              element={<StudentsOfClass />}
            />
          </Switch>
        </div>
      </div>
      <footer className="copyRight">
        <p>&copy;YishaiC</p>
      </footer>
    </ThemeContext.Provider>
  );
}

export default App;
