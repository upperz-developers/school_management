import {
  Box,
  Button,
  Card,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { FaRegEdit } from "react-icons/fa";
// import { MdOutlineDelete } from "react-icons/md";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialogs from "../models/Dialogs";
// import GetData from "../../App/Data/GetData";
// import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LuSchool } from "react-icons/lu";
import { MdGroups2 } from "react-icons/md";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { useSelector } from "react-redux";
import ScrollToTop from "../models/ScrollToTop";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HistoriqueFrais from "./HistoriqueFrais";

const Students = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activedTab, setActivedTab] = useState(0);
  const [right, setRight] = React.useState(false);
  const { newData } = useSelector((state) => state.auth);
  const filteredData = newData?.data?.data?.filter((item) => {
    return Object?.keys(item)?.some((key) =>
      item[key]?.toString()?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
  });

  const handleClick = (index) => {
    setActivedTab(index);
    setRight(true);
  };

  const handleDrawerClose = () => {
    setRight(false);
  };

  let tabStudents = [
    {
      section: "Informatique appliquée",
      content: [
        {
          promotion: "G2",
          effectif: "56",
          girls: "18",
          boy: "38",
          description: <>Bonjour</>,
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ marginTop: "80px" }}>
        <ScrollToTop />
        <Grid item xs={12}>
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Grid item xs={12} sm={12} md={8}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { md: "28px", xs: "21px" },
                    color: "#01a9f9",
                  }}
                  fontWeight={600}
                >
                  Les étudiants
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Grid
                  container
                  spacing={1}
                  sx={{ alignItems: "center", color: "#01a9f9" }}
                >
                  <Grid item xs={9} sm={5} md={9}>
                    <TextField
                      id="outlined-basic"
                      label="Recherche..."
                      sx={{
                        width: { dm: "250px", xs: "100%" },

                        borderRadius: "4px",
                      }}
                      name="txt"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      InputLabelProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      InputProps={{
                        sx: {
                          fieldset: {
                            border: "1px solid white!important",
                            // borderRadius: 4,
                          },
                          "&:hover fieldset": {
                            border: "1px solid #01a9f9!important",
                            color: "#01a9f9",
                          },
                          "&:focus-within fieldset, &:focus-visible fieldset": {
                            border: "1px solid #01a9f9!important",
                            color: "#01a9f9",
                          },
                        },
                      }}
                      inputProps={{
                        sx: {
                          color: "white",
                          paddingLeft: "15px",
                          fontSize: "20px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} sm={7} md={3}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Dialogs
                        actions={
                          <AddIcon
                            style={{
                              backgroundColor: "#01a9f9",
                              color: "white",
                              width: "36px",
                              height: "36px",
                              padding: "7px",
                              borderRadius: "4px",
                            }}
                          />
                        }
                        DialogTitle="Insertion d'une dépense"
                        typeAction="Inserer une dépense"
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div
              style={{
                maxHeight: "100%",
                overflow: "auto",
                height: "700px",
                paddingTop: "50px",
                display: "flex",
                gap: 20,
                flexDirection: "column",
              }}
            >
              {tabStudents.map((student) => {
                return (
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                      {student.section}
                    </Typography>

                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 2, sm: 8, md: 16 }}
                    >
                      {student.content.map((content, index) => {
                        return (
                          <Grid item xs={2} sm={4} md={4}>
                            <button
                              onClick={() => {
                                handleClick(index);
                                console.log(activedTab);
                              }}
                              style={{
                                width: "100%",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <Card
                                variant="outlined"
                                sx={{
                                  padding: "15px",
                                  backgroundColor: "rgba(255, 255, 255, 0.141)",
                                  borderColor: "white",
                                  color: "white",
                                }}
                              >
                                <List>
                                  <ListItem
                                    secondaryAction={
                                      <Typography
                                        variant="h5"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        {content.promotion}
                                      </Typography>
                                    }
                                  >
                                    <ListItemAvatar>
                                      <LuSchool color="#01a9f9" fontSize={24} />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary="Promotion"
                                      secondary=""
                                    />
                                  </ListItem>
                                  <ListItem
                                    secondaryAction={<p>{content.effectif}</p>}
                                  >
                                    <ListItemAvatar>
                                      <MdGroups2
                                        color="#01a9f9"
                                        fontSize={26}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary="Effectif"
                                      secondary=""
                                    />
                                  </ListItem>
                                  <ListItem
                                    secondaryAction={<p>{content.boy}</p>}
                                  >
                                    <ListItemAvatar>
                                      <FcBusinessman
                                        color="#01a9f9"
                                        fontSize={28}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary="Garçons"
                                      secondary=""
                                    />
                                  </ListItem>
                                  <ListItem
                                    secondaryAction={<p>{content.girls}</p>}
                                  >
                                    <ListItemAvatar>
                                      <FcBusinesswoman
                                        color="#01a9f9"
                                        fontSize={28}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary="Filles"
                                      secondary=""
                                    />
                                  </ListItem>
                                </List>
                              </Card>
                            </button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          </Card>
        </Grid>
      </Grid>
      {tabStudents.map((item) => {
        return (
          <Drawer
            anchor="right"
            open={right}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 1250,
                backgroundColor: "rgb(27, 42, 58)",
                color: "white",
                // paddingTop: "80px",
              },
            }}
          >
            <HistoriqueFrais />
          </Drawer>
        );
      })}
      {/* <Drawer
        anchor="right"
        open={right}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 1250,
            backgroundColor: "rgb(27, 42, 58)",
            color: "white",
            paddingTop: "80px",
          },
        }}
      >
     
      </Drawer> */}
    </React.Fragment>
  );
};

export default Students;
