import { Grid, List, TextField, Typography } from "@mui/material";
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
import Avatar from "react-nice-avatar";
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
// import { FixedSizeList } from "react-window";

const HistoriqueFrais = () => {
  // const [value, setValue] = React.useState("1");
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
  let debts = filteredData;

  function CustomizedTables({ type, status }) {
    function Cours() {
      const [checked, setChecked] = React.useState([]);

      const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
      };

      return (
        <List dense sx={{ width: "100%", maxWidth: 360 }}>
          {["Robotique", "Math", "Anglais"].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                    sx={{ color: "white" }}
                  />
                }
                disablePadding
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })}
        </List>
      );
    }

    const modelDataTab = () => {
      let tabData = [];

      for (let i = 0; i < debts?.length; i++) {
        function createData(
          id,
          entreprise,
          name,
          tel,
          address,
          amount,
          status,
          amount_rest,
          created_at
        ) {
          return {
            id,
            entreprise,
            name,
            tel,
            address,
            amount,
            status,
            amount_rest,
            created_at,
          };
        }
        const element = debts[i];

        if (element?.type === type && element?.status === status) {
          tabData.push(
            createData(
              element?.id,
              element?.enterprise,
              element?.person?.nom,
              element?.person?.number,
              element?.person?.address,
              element?.amount,
              element?.status,
              element?.debtpaied,
              element?.created_at
            )
          );
        }
      }

      return tabData;
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.transparent,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.common.white,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));
    // const StyledTableCell = styled(TableCell)(({ theme }) => ({
    //   [`&.${tableCellClasses.head}`]: {
    //     backgroundColor: theme.palette.common.transparent,
    //     color: theme.palette.common.white,
    //   },
    //   [`&.${tableCellClasses.body}`]: {
    //     fontSize: 14,
    //     color: theme.palette.common.white,
    //   },
    // }));

    // const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //   "&:nth-of-type(odd)": {
    //     backgroundColor: theme.palette.action.hover,
    //   },
    //   // hide last border
    //   "&:last-child td, &:last-child th": {
    //     border: 0,
    //   },
    // }));
    // const monthDataExpenseEntry = () => {
    //   let expense = [];
    //   datayears?.forEach((y) => {
    //     return expense.push(y?.data?.entry);
    //   });
    //   return expense;
    // };

    return (
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          borderRadius: "0 0 4px 4px",
          coloe: "white",
          backgroundColor: "transparent",
          // maxHeight: 405,
          height: "700px",
        }}
      >
        <Table
          sx={{ minWidth: 700 }}
          // stickyHeader
          // aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Noms</StyledTableCell>
              <StyledTableCell align="left">Promotions</StyledTableCell>
              <StyledTableCell align="left">Faculté</StyledTableCell>
              <StyledTableCell align="left">Montant</StyledTableCell>
              <StyledTableCell align="left">Détail</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {modelDataTab().map((row) => {   return ( */}
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Baruka David</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">L2</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Informatique appl</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>1200 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5">Jacques Muhongya</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">G1</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Electricité indi</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>200 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Grace Mastaki</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">G1</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Informatique appl</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>300 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Exauce Muhongya</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">G3</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Electricite indi</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>100 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Aime Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">G2</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Genie Informatique </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>500 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Grace Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">L2</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Informatique appl</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>400</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Dodo Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">L1</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>gestion De Compte</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>45 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5">Salama Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">L2</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Informatique appl</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>104 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Innocent Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">G1</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Batiment</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>120 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Scav Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">L2</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Informatique appl</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>124 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow
            //  key={row?.id}
            >
              <StyledTableCell component="th" scope="row">
                <Typography variant="h5"> Slack Baraka</Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography variant="h6">L1</Typography>
              </StyledTableCell>

              <StyledTableCell align="left">
                <p>Gestion Des Ressources Naturelle</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>300 $</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Dialogs
                  actions={<MdOutlineVisibility fontSize={24} color="white" />}
                  // nameUser={row?.entreprise}
                  // dateUser={dayjs(row?.created_at).format("DD/MM/YYYY")}
                  // admin={row?.admin}
                  // actived={row?.actived}
                  DialogTitle="Détails de l'utilisateur"
                  // typeAction={
                  //   // row?.actived === false
                  //   //   ? "Activer le compte"
                  //   //   : "Désactiver le compte"
                  // }
                  idUser="ywuijkqjxkmlq,wq"
                />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  const handleClick = (index) => {
    setActivedTab(index);
  };
  let tabMenu = [
    {
      menu: "Pas encore",
      content: <CustomizedTables type="debt" status="pending" />,
    },
    {
      menu: "Payées",
      content: <CustomizedTables type="debt" status="finished" />,
    },
    {
      menu: "En cours",
      content: <CustomizedTables type="debt" status="running" />,
    },
  ];

  // Renvoie le formulaire de recherche

  // Définissez l"état du composant pour stocker les données de recherche

  // Créez une fonction de gestionnaire d"événements pour la soumission de la recherche

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
                  <Grid item xs={12} sm={4} md={8}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { md: "28px", xs: "21px" },
                        color: "#01a9f9",
                      }}
                      fontWeight={600}
                    >
                      Historiques de paiements
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ alignItems: "center", color: "#01a9f9" }}
                    >
                      <Grid item xs={12} sm={12} md={12}>
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
                      </Grid>
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div
              style={{
                maxHeight: "100%",
                overflow: "auto",

                // paddingTop: "50px",
                display: "flex",
                // gap: 20,
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  // boxShadow:
                  //   "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
              >
                {/* <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "transparent",
                    color: "white",
                    borderRadius: "4px 4px 0 0",
                    marginBottom: "10px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    border: "1px solid white!important",
                  }}
                >
                  <Toolbar>
                    <List
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        color: "white",
                      }}
                    >
                      {tabMenu.map((menu, index) => {
                        return (
                          <button
                            style={
                              activedTab === index
                                ? {
                                    padding: "3px 10px",
                                    color: "#01a9f9",
                                    border: "none",
                                    fontSize: "16px",
                                    backgroundColor: "transparent",
                                  }
                                : {
                                    border: "none",
                                    fontSize: "16px",
                                    color: "white",
                                    backgroundColor: "transparent",
                                  }
                            }
                            onClick={() => {
                              handleClick(index);
                            }}
                          >
                            {menu.menu}
                          </button>
                        );
                      })}
                    </List>
                  </Toolbar>
                </AppBar> */}

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <CustomizedTables type="debt" status="running" />
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

export default HistoriqueFrais;
