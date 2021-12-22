import React from "react";
import ClassPage from "./components/ClassPage/ClassPage";
import StudentPage from "./components/StudentsPage/StudentPage";
import CreatePage from "./components/CreatePage/CreatePage";
import { Route, Routes as Switch, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function App() {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Shob Classes
            </Typography>
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
      <div style={{padding:50,  display:'flex'}}>
        <Switch>
          <Route path="/" element={<ClassPage />} />
          <Route path="/StudentPage" element={<StudentPage />} />
          <Route path="/CreatePage" element={<CreatePage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
