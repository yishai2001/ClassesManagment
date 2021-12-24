import React, { useState } from "react";
import ClassPage from "./components/ClassesPage/ClassesPage";
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
import "./App.css"

function App() {
  const navigate = useNavigate();

  //context blue/red mode
  const [blueMode, setBlueMode] = useState<boolean>(true);

  const changeColor = (): void => {
    setBlueMode(!blueMode);
    console.log(blueMode);
  };

  const themeStyles = {
    backgroundColor: blueMode? "#1976d2" : "#e73f3f"
  }

  //menu hadler
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeContext.Provider value={blueMode}>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static"  style={themeStyles}>
            <Toolbar style={themeStyles}>
              <IconButton
                onClick={handleClick}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" style={{marginRight:20}} >
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
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/")}>Class Student</MenuItem>
            <MenuItem onClick={() => navigate("/StudentPage")}>
              Student Page
            </MenuItem>
            <MenuItem onClick={() => navigate("/CreatePage")}>
              Create Page
            </MenuItem>
          </Menu>
        </div>
        <div style={{ padding: 50, display: "flex" }}>
          <Switch>
            <Route path="/" element={<ClassPage />} />
            <Route path="/StudentPage" element={<StudentPage />} />
            <Route path="/CreatePage" element={<CreatePage />} />
          </Switch>
        </div>
      </div>
    <footer className="copyRight"><p>&copy;YishaiC</p></footer>
    </ThemeContext.Provider>
  );
}

export default App;
