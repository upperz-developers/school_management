import { Card, Grid, List, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialogs from "../models/Dialogs";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Loader from "../models/Loader";
import { useSelector } from "react-redux";
import ScrollToTop from "../models/ScrollToTop";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineVisibility } from "react-icons/md";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Config = () => {

  const [activedTab, setActivedTab] = useState(0);
  // const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { newData } = useSelector((state) => state.auth);
  let tabAllData = newData;

  const filteredData = tabAllData?.data?.debt.filter((item) => {
    return Object?.keys(item)?.some((key) =>
      item[key]?.toString()?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
  });

  return (
    <React.Fragment>
      <Grid container spacing={1} sx={{ marginTop: "80px" }}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                marginBottom: "25px",
              }}
            >
              <ScrollToTop />
              <Grid item xs={12}>
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { md: "28px", xs: "21px" },
                        color: "#01a9f9",
                      }}
                      fontWeight={600}
                    >
                      Configuration
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div
              style={{
                maxHeight: "100%",
                overflow: "auto",

                display: "flex",

                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Grid
                  container
                  spacing={1}
                  sx={{
                    diplay: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    height: "710px",
                  }}
                >
                  <Grid item xs={4.5}>
                    <Card
                      sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        display: "flex",
                        gap: "25px",
                        padding: "20px",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100 }}
                          />
                        </Stack>
                        {/* <Typography variant="h1">Logo</Typography> */}
                      </div>
                      <Card
                        sx={{
                          backgroundColor: "transparent",
                          color: "white",
                          border: "1px solid white",
                          padding: "20px",
                          display: "flex",
                          gap: "25px",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextField
                            id="standard-helperText"
                            label="Université"
                            // defaultValue="ISTA/GOMA"
                            // helperText="Some important text"
                            variant="standard"
                            sx={{ width: "100%", color: "white" }}
                            InputLabelProps={{
                              sx: {
                                color: "white",
                              },
                            }}
                            InputProps={{
                              sx: {
                                borderBottom: "1px solid white!important",
                                fieldset: {
                                  border: "1px solid white!important",
                                  // borderRadius: 4,
                                },
                                "&:hover fieldset": {
                                  border: "1px solid #01a9f9!important",
                                  color: "#01a9f9",
                                },
                                "&:focus-within fieldset, &:focus-visible fieldset":
                                  {
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
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextField
                            id="standard-helperText"
                            label="Année académique"
                            // defaultValue="ISTA/GOMA"
                            // helperText="Some important text"
                            variant="standard"
                            sx={{ width: "100%", color: "white" }}
                            InputLabelProps={{
                              sx: {
                                color: "white",
                              },
                            }}
                            InputProps={{
                              sx: {
                                borderBottom: "1px solid white!important",
                                fieldset: {
                                  border: "1px solid white!important",
                                  // borderRadius: 4,
                                },
                                "&:hover fieldset": {
                                  border: "1px solid #01a9f9!important",
                                  color: "#01a9f9",
                                },
                                "&:focus-within fieldset, &:focus-visible fieldset":
                                  {
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
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextField
                            id="standard-helperText"
                            label="Nom complet du résponsable"
                            // defaultValue="ISTA/GOMA"
                            // helperText="Some important text"
                            variant="standard"
                            sx={{ width: "100%", color: "white" }}
                            InputLabelProps={{
                              sx: {
                                color: "white",
                              },
                            }}
                            InputProps={{
                              sx: {
                                borderBottom: "1px solid white!important",
                                fieldset: {
                                  border: "1px solid white!important",
                                  // borderRadius: 4,
                                },
                                "&:hover fieldset": {
                                  border: "1px solid #01a9f9!important",
                                  color: "#01a9f9",
                                },
                                "&:focus-within fieldset, &:focus-visible fieldset":
                                  {
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
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextField
                            id="standard-helperText"
                            label="Adresse de l'université"
                            // defaultValue="ISTA/GOMA"
                            // helperText="Some important text"
                            variant="standard"
                            sx={{ width: "100%", color: "white" }}
                            InputLabelProps={{
                              sx: {
                                color: "white",
                              },
                            }}
                            InputProps={{
                              sx: {
                                borderBottom: "1px solid white!important",
                                fieldset: {
                                  border: "1px solid white!important",
                                  // borderRadius: 4,
                                },
                                "&:hover fieldset": {
                                  border: "1px solid #01a9f9!important",
                                  color: "#01a9f9",
                                },
                                "&:focus-within fieldset, &:focus-visible fieldset":
                                  {
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
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <TextField
                            id="standard-helperText"
                            label="Description"
                            // defaultValue="ISTA/GOMA"
                            // helperText="Some important text"
                            variant="standard"
                            sx={{ width: "100%", color: "white" }}
                            InputLabelProps={{
                              sx: {
                                color: "white",
                              },
                            }}
                            InputProps={{
                              sx: {
                                borderBottom: "1px solid white!important",
                                fieldset: {
                                  border: "1px solid white!important",
                                  // borderRadius: 4,
                                },
                                "&:hover fieldset": {
                                  border: "1px solid #01a9f9!important",
                                  color: "#01a9f9",
                                },
                                "&:focus-within fieldset, &:focus-visible fieldset":
                                  {
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
                        </div>
                        <Accordion
                          sx={{
                            backgroundColor: "transparent",
                            color: "white",
                            borderBottom: "1px solid white",
                            boxShadow: "none",
                            boderRaduis: "0",
                            paddingLeft: "0",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: "white" }} />
                            }
                            sx={{
                              paddingLeft: "0",
                              boderRaduis: "0",
                            }}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Contacts</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div
                              style={{
                                backgroundColor: "transparent",
                                color: "white",

                                padding: "0px",
                                display: "flex",
                                gap: "25px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <TextField
                                  id="standard-helperText"
                                  label="Email"
                                  // defaultValue="ISTA/GOMA"
                                  // helperText="Some important text"
                                  variant="standard"
                                  sx={{ width: "100%", color: "white" }}
                                  InputLabelProps={{
                                    sx: {
                                      color: "white",
                                    },
                                  }}
                                  InputProps={{
                                    sx: {
                                      borderBottom: "1px solid white!important",
                                      fieldset: {
                                        border: "1px solid white!important",
                                        // borderRadius: 4,
                                      },
                                      "&:hover fieldset": {
                                        border: "1px solid #01a9f9!important",
                                        color: "#01a9f9",
                                      },
                                      "&:focus-within fieldset, &:focus-visible fieldset":
                                        {
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
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <TextField
                                  id="standard-helperText"
                                  label="Tel"
                                  // defaultValue="ISTA/GOMA"
                                  // helperText="Some important text"
                                  variant="standard"
                                  sx={{ width: "100%", color: "white" }}
                                  InputLabelProps={{
                                    sx: {
                                      color: "white",
                                    },
                                  }}
                                  InputProps={{
                                    sx: {
                                      borderBottom: "1px solid white!important",
                                      fieldset: {
                                        border: "1px solid white!important",
                                        // borderRadius: 4,
                                      },
                                      "&:hover fieldset": {
                                        border: "1px solid #01a9f9!important",
                                        color: "#01a9f9",
                                      },
                                      "&:focus-within fieldset, &:focus-visible fieldset":
                                        {
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
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <TextField
                                  id="standard-helperText"
                                  label="Site web"
                                  // defaultValue="ISTA/GOMA"
                                  // helperText="Some important text"
                                  variant="standard"
                                  sx={{ width: "100%", color: "white" }}
                                  InputLabelProps={{
                                    sx: {
                                      color: "white",
                                    },
                                  }}
                                  InputProps={{
                                    sx: {
                                      borderBottom: "1px solid white!important",
                                      fieldset: {
                                        border: "1px solid white!important",
                                        // borderRadius: 4,
                                      },
                                      "&:hover fieldset": {
                                        border: "1px solid #01a9f9!important",
                                        color: "#01a9f9",
                                      },
                                      "&:focus-within fieldset, &:focus-visible fieldset":
                                        {
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
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </Card>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Config;
