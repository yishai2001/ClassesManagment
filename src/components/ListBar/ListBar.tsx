import React, { useContext, useState, useEffect } from "react";
import { Route, Routes as Switch, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import ThemeContext from "../ThemeContext/ThemeContext";
import {routes,} from "../../AppHelper"

const ListBar = (
  props:{
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void,
  state: boolean
}) => {

  const {toggleDrawer, state} = props;
  const navigate = useNavigate();

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {routes.map(({path, name}, key) =>
        <ListItem  key={key} style={{fontSize:20}} onClick={() => navigate(path)}>{name}</ListItem>)}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
        <Drawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer}
        >
            {list()}
        </Drawer>
        </React.Fragment>
    </div>
  );
}

export default ListBar;
