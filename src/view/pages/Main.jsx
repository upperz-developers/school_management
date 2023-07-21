import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { MdOutlineSchool, MdPayment, MdAttachMoney } from "react-icons/md";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Avatar, { genConfig } from "react-nice-avatar";
import History from "../components/HistoriqueFrais";
import Dashboard from "../components/Dashboard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Students from "../components/Students";
import Profs from "../components/Profs";
import HistoriqueFrais from "../components/HistoriqueFrais";
import Config from "../components/Config";
import Dialogs from "../models/Dialogs";
// import { Dashboard } from "@mui/icons-material";

const drawerWidth = 240;
const TabYears = [
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
];

function Main(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activedTab, setActivedTab] = useState(0);
  const [authenticated, setauthenticated] = useState(false);
  const [value, setValue] = React.useState("Année académique");
  const [inputValue, setInputValue] = React.useState("");
//   const { newData, user } = useSelector((state) => state.auth);

//   const userStates = JSON.parse(JSON.stringify(user));
  const config = genConfig("hi@dapi.to");
  const { window } = props;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = (index) => {
    setActivedTab(index);
    setMobileOpen(false);
  };
  let tabContent = [
    {
      menu: "Dashboard",
      content: (
        <Dashboard
          actived={() => {
            setActivedTab(4);
            setMobileOpen(false);
          }}
        />
      ),
      icon: <LuLayoutDashboard fontSize={20} />,
    },
    {
      menu: "Etudiants",
      content: <Students />,
      icon: <MdOutlineSchool fontSize={21} />,
    },
    // {
    //   menu: "Professeurs",
    //   content: <Profs />,
    //   icon: <GiTeacher fontSize={20} />,
    // },
    {
      menu: "Frais",
      content: <HistoriqueFrais />,
      icon: <MdAttachMoney fontSize={20} />,
    },
    {
      menu: "Paiements",
      content: <>bonjour</>,
      icon: <MdPayment fontSize={20} />,
    },
    {
      menu: "Configurations",
      content: <Config />,
      icon: <AiOutlineSetting fontSize={20} />,
    },
  ];
  function OptionSchoolYears() {
    const [inputValue, setInputValue] = React.useState("");

    return (
      <div style={{ color: "white" }}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={TabYears}
          sx={{ width: 220, color: "white" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Controllable"
              sx={{ border: "none", color: "white" }}
            />
          )}
        />
      </div>
    );
  }
  const drawer = (
    <div style={{ zIndex: 999 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          color: "#01a9f9",
          fontWeight: "bold",
          padding: "20px 30px",
        }}
      >
        School
        <br /> Managment
      </Typography>
      <List>
        {tabContent.map((text, index) => {
          return (
            <ListItem
              key={text.menu}
              className={activedTab === index ? "tab active" : "tab"}
              sx={activedTab === index ? { color: "#01a9f9" } : {}}
            >
              <ListItemButton
                onClick={() => {
                  handleClick(index);
                }}
              >
                <ListItemIcon
                  sx={
                    activedTab === index
                      ? { color: "#01a9f9", fontWeight: "600" }
                      : { color: "white" }
                  }
                >
                  {text?.icon}
                </ListItemIcon>
                <ListItemText primary={text.menu} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgb(27, 42, 58)",
        color: "white",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgb(27, 42, 58)",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Toolbar>
              <IconButton
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </div>

          <Box
            id="logout"
            sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            {/* <Card sx={{ padding: "2px 5px" }}>
              <p>{user.email}</p>
            </Card> */}
            {/* <div style={{ color: "white" }}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={TabYears}
                sx={{ width: 220, color: "white" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Controllable"
                    sx={{ border: "none", color: "white" }}
                  />
                )}
              />
            </div> */}
            <div>{`${value !== null ? `${value}` : "Année académique"}`}</div>
            <Avatar style={{ width: "2rem", height: "2rem" }} {...config} />
            <Dialogs
              actions={
                <TbLogout
                  color="red"
                  fontSize={30}
                  style={{
                    padding: "7px",
                    backgroundColor: "#01aaf92b",
                    color: "#01a9f9",
                    borderRadius: "5px",
                  }}
                />
              }
              DialogTitle="Quitter la session"
              typeAction="Quitter !"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(27, 42, 58)",
              color: "white",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
          position: "relative",
          backgroundColor: "rgb(27, 42, 58)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {tabContent[activedTab].content}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Main.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Main;
