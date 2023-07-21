import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Box } from "@mui/system";
import { Avatar, List } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { stateAction } from "../../controller/app/redux/actions/auth.action";
import { loginout } from "../../controller/app/auth/auth";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Dialogs({
  actions,
  content,
  styleDialog,
  DialogTitle,
  typeAction,
  namePaidDebt,
  datePaid,
  idPaid,
  valueIdModified,
  valueLibModified,
  valueEntModified,
  valueDescModified,
  valueAmountModified,
  //user
  idUser,
  dateUser,
  nameUser,
  admin,
  actived,
  //detail entry
  valueId,
  valueDescript,
  valueLib,
  valueEntry,
  valueAmount,
  valueDate,
  //operation
  idOperation,
}) {
  const [open, setOpen] = React.useState(false);
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [designationDebt, setDesignationDebt] = useState("");
  const [amountDebt, setAmountDebt] = useState("");
  const [enterpriseDebt, setEnterpriseDebt] = useState("");
  const [nameDebt, setNameDebt] = useState("");
  const [addressDebt, setAddressDebt] = useState("");
  const [telephoneDebt, setTelephoneDebt] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [type, setType] = useState(false);
  const [typeValue, setTypeValue] = useState("Une entrée");
  const [isActived, setIsActived] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [pswUser, setpswUser] = useState("");
  // const [data, setData] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("email"));
  const [status, setStatus] = useState(false);
  const { isLoading, newData } = useSelector((state) => state.auth);

  const handleChangeTypeEntry = (event) => {
    setTypeValue(event.target.value);
  };
  // const handleChangeTypeUser = (event) => {
  //   setUserValue(event.target.value);
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const history = {
    navigate: null,
    location: null,
  };

  let Entrysuccess = "";
  const handleClickEntry = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.post(
        `https://api-expense-management.upper-z.dev/api/v1/flux/create`,
        {
          enterprise: enterprise,
          designation: designation,
          description: description,
          amount: amount,
          type: "entry",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: newData,
        })
      );
      setEnterprise("");
      setDesignation("");
      setDescription("");
      setAmount(0);

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );
      toast.success(results.data.message);

      Entrysuccess = results.data.message;
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickDebt = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.post(
        `https://api-expense-management.upper-z.dev/api/v1/flux/create`,
        {
          enterprise: enterpriseDebt,
          designation: designationDebt,
          nom: nameDebt,
          number: telephoneDebt,
          address: addressDebt,
          description: "Description for all operations",
          amount: amountDebt,
          type: "debt",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      // localStorage.setItem("email", JSON.stringify(results.data));
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: newData,
        })
      );
      setEnterpriseDebt("");
      setDesignationDebt("");
      setNameDebt("");
      setTelephoneDebt("");
      setAddressDebt("");
      setAmountDebt(0);

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      Entrysuccess = results.data.message;
      toast.success(results.data.message);
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickOutput = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.post(
        `https://api-expense-management.upper-z.dev/api/v1/flux/create`,
        {
          enterprise: enterprise,
          designation: designation,
          description: description,
          amount: amount,
          type: "output",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: newData,
        })
      );
      setEnterprise("");
      setDesignation("");
      setDescription("");
      setAmount(0);

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );
      toast.success(results.data.message);
      // localStorage.setItem("email", JSON.stringify(results.data));

      Entrysuccess = results.data.message;
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickOutputModify = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.put(
        `https://api-expense-management.upper-z.dev/api/v1/flux/update/${valueIdModified}`,
        {
          enterprise: enterprise,
          designation: designation,
          description: description,

          type: "output",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      // localStorage.setItem("email", JSON.stringify(results.data));
      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      toast.success(results.data.message);
      setEnterprise("");
      setDesignation("");
      setDescription("");
      setOpen(false);

      toast.success(results.data.message);
      Entrysuccess = results.data.message;
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickRestor = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.put(
        `https://api-expense-management.upper-z.dev/api/v1/flux/restore/${idOperation}`,

        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: newData,
        })
      );

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );
      toast.success(results.data.message);

      setOpen(false);
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );
    }
  };
  const handleClickEntryModify = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.put(
        `https://api-expense-management.upper-z.dev/api/v1/flux/update/${valueIdModified}`,
        {
          enterprise: enterprise,
          designation: designation,
          description: description,

          type: "entry",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      // localStorage.setItem("email", JSON.stringify(results.data));
      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      toast.success(results.data.message);
      setEnterprise("");
      setDesignation("");
      setDescription("");
      setOpen(false);

      // localStorage.setItem("email", JSON.stringify(results.data));

      Entrysuccess = results.data.message;

      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickAddUser = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.post(
        `https://api-expense-management.upper-z.dev/api/v1/user/create`,
        {
          email: emailUser,
          password: pswUser,
          is_active: true,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      // localStorage.setItem("email", JSON.stringify(results.data));
      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      toast.success(results.data.message);

      setOpen(false);

      // localStorage.setItem("email", JSON.stringify(results.data));

      Entrysuccess = results.data.message;

      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickPaid = async () => {
    if (amountPaid === "") {
      toast.error("veillez entrer un montant !");
      return;
    }
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.put(
        `https://api-expense-management.upper-z.dev/api/v1/payement/debt/${idPaid}`,
        {
          amountpaied: amountPaid,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      setAmountPaid("");
      toast.success(results.data.message);

      // localStorage.setItem("email", JSON.stringify(results.data));

      Entrysuccess = results.data.message;
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );
      toast.error(messageError);
      return Entrysuccess;
    }
  };
  const handleClickLogout = async () => {
    dispatch(stateAction({ isLoading: false, isError: "", isSuccess: "" }));

    if ((await loginout(dispatch, navigate)) !== "") {
      return;
    }
    console.log("loginout");
    history.navigate("/");
  };
  const handleClickIsAdmin = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.put(
        `https://api-expense-management.upper-z.dev/api/v1/role/${idUser}`,

        { isAdmin: status },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: newData,
        })
      );

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );
      toast.success(results.data.message);

      Entrysuccess = results.data.message;
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickIsActived = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.put(
        `https://api-expense-management.upper-z.dev/api/v1/role/${idUser}`,

        {
          isActive: typeAction === "Activer le compte" ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      console.log();
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: newData,
        })
      );

      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );
      toast.success(results.data.message);

      Entrysuccess = results.data.message;
      setOpen(false);
      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickEntryDelete = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.delete(
        `https://api-expense-management.upper-z.dev/api/v1/flux/delete/${valueId}`,

        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      // localStorage.setItem("email", JSON.stringify(results.data));
      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      toast.success(results.data.message);

      setOpen(false);

      // localStorage.setItem("email", JSON.stringify(results.data));

      Entrysuccess = results.data.message;

      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickOutputDelete = async () => {
    dispatch(
      stateAction({
        isLoading: true,
        isSuccess: "",
        isError: "",
        newData: newData,
      })
    );

    try {
      const results = await axios.delete(
        `https://api-expense-management.upper-z.dev/api/v1/flux/delete/${valueId}`,

        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );

      // localStorage.setItem("email", JSON.stringify(results.data));
      const updated = await axios.get(
        `https://api-expense-management.upper-z.dev/api/v1/flux/findall`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token.token}`,
          },
        }
      );
      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: results.data.message,
          isError: "",
          newData: updated,
        })
      );

      toast.success(results.data.message);

      setOpen(false);

      // localStorage.setItem("email", JSON.stringify(results.data));

      Entrysuccess = results.data.message;

      return Entrysuccess;
    } catch (error) {
      const messageError =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(messageError);

      dispatch(
        stateAction({
          isLoading: false,
          isSuccess: "",
          isError: messageError,
          newData: newData,
        })
      );

      return Entrysuccess;
    }
  };
  const handleClickForAll = (value) => {
    switch (value) {
      case "Insertion d'une dépense":
        return handleClickOutput;
      case "Insertion d'une entrée":
        if (type) {
          return handleClickDebt;
        } else {
          return handleClickEntry;
        }
      case "Quitter la session":
        return handleClickLogout;
      case "Détail d'une entrée":
        return handleClickEntryDelete;
      case "Détail de la dépense":
        return handleClickOutputDelete;
      case "Modifier une entrée":
        return handleClickEntryModify;
      case "Réinitialisation ":
        return handleClickRestor;
      case "Modifier une dépense":
        return handleClickOutputModify;
      case "Ajouter un utilisateur":
        return handleClickAddUser;
      case "Changer statuts":
        return handleClickIsAdmin;
      case "Détails de l'utilisateur":
        return handleClickIsActived;
      case "Paiement dette":
        return handleClickPaid;
      default:
        return;
    }
  };
  const ModelTestDialog = (value) => {
    switch (value) {
      case "Insertion d'une entrée":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: { type: "420px", setType: "450px" },
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {/* <FormControl sx={{ minWidth: 80, width: 150 }} size="small">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeValue}
                  label="Type"
                  onChange={handleChangeTypeEntry}
                >
                  <MenuItem
                    // value={typeValue}
                    onClick={() => {
                      setType(false);
                    }}
                  >
                    Une entrée
                  </MenuItem>
                  <MenuItem
                    // value={typeValue}
                    onClick={() => {
                      setType(true);
                    }}
                  >
                    Une dette
                  </MenuItem>
                </Select>
              </FormControl> */}
              <FormControl sx={{ minWidth: 80, width: 150 }} size="small">
                <InputLabel id="demo-select-small-label">Type</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={typeValue}
                  label="type"
                  onChange={handleChangeTypeEntry}
                >
                  <MenuItem
                    value={10}
                    onClick={() => {
                      setType(false);
                    }}
                  >
                    Une entrée
                  </MenuItem>
                  <MenuItem
                    value={20}
                    onClick={() => {
                      setType(true);
                    }}
                  >
                    Une dette
                  </MenuItem>
                </Select>
              </FormControl>
              {type ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Libele"
                    variant="outlined"
                    onChange={(e) => {
                      setDesignationDebt(e.target.value);
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Nom de l'entrée"
                    variant="outlined"
                    onChange={(e) => {
                      setEnterpriseDebt(e.target.value);
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Noms de la personne"
                    variant="outlined"
                    onChange={(e) => {
                      setNameDebt(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="tel"
                    variant="outlined"
                    onChange={(e) => {
                      setTelephoneDebt(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Adresse physique"
                    variant="outlined"
                    onChange={(e) => {
                      setAddressDebt(e.target.value);
                    }}
                  />
                  <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Montant
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Montant"
                      onChange={(e) => {
                        setAmountDebt(e.target.value);
                      }}
                    />
                  </FormControl>
                </>
              ) : (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Libele"
                    variant="outlined"
                    onChange={(e) => {
                      setDesignation(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Nom de l'entrée"
                    variant="outlined"
                    onChange={(e) => {
                      setEnterprise(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Montant
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Montant"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </FormControl>
                </>
              )}
            </Box>
          </React.Fragment>
        );
      case "Ajouter un utilisateur":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: { type: "420px", setType: "450px" },
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                variant="outlined"
                label="Email"
                required
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                label="password"
                required
                onChange={(e) => {
                  setpswUser(e.target.value);
                }}
              />
            </Box>
          </React.Fragment>
        );
      case "Insertion d'une dépense":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: "420px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Libele"
                variant="outlined"
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                onChange={(e) => {
                  setEnterprise(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Montant
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Montant"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
          </React.Fragment>
        );

      case "Modifier une entrée":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: "420px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                variant="outlined"
                label="Libele"
                id={valueIdModified}
                required
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
                defaultValue={valueLibModified}
              />
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                required
                onChange={(e) => {
                  setEnterprise(e.target.value);
                }}
                defaultValue={valueEntModified}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                required
                defaultValue={valueDescModified}
                variant="outlined"
                multiline
                rows={4}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Montant
                </InputLabel>
                <OutlinedInput
                  disabled
                  id="outlined-adornment-amount"
                  defaultValue={valueAmountModified}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Montant"
                />
              </FormControl>
            </Box>
          </React.Fragment>
        );
      case "Modifier une dépense":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: "420px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                variant="outlined"
                label="Libele"
                id={valueIdModified}
                required
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
                defaultValue={valueLibModified}
              />
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                required
                onChange={(e) => {
                  setEnterprise(e.target.value);
                }}
                defaultValue={valueEntModified}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                required
                defaultValue={valueDescModified}
                variant="outlined"
                multiline
                rows={4}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Montant
                </InputLabel>
                <OutlinedInput
                  disabled
                  id="outlined-adornment-amount"
                  defaultValue={valueAmountModified}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Montant"
                />
              </FormControl>
            </Box>
          </React.Fragment>
        );

      case "Détail d'une entrée":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "380px" },
                height: "250px",
                padding: "0px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <List sx={{ padding: "5px 15px" }}>
                {valueLib}
                <br />
                <br />
                <strong>{valueEntry}</strong>
                <br />
                <br />
                {valueDescript}
                <br />
                <br />
                {valueDate}
              </List>
            </Box>
          </React.Fragment>
        );
      case "Détail de la dépense":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "380px" },
                height: "250px",
                padding: "0px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <List sx={{ padding: "5px 15px" }}>
                {valueLib}
                <br />
                <br />
                <strong>{valueEntry}</strong>
                <br />
                <br />
                {valueDescript}
                <br />
                <br />
                {valueDate}
              </List>
            </Box>
          </React.Fragment>
        );
      case "Quitter la session":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "350px" },
                height: "150px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography color="red">
                Voulez-vous vraiment sortir de l'application... ?
              </Typography>
            </Box>
          </React.Fragment>
        );
      case "Réinitialisation ":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "350px" },
                height: "150px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography color="red">
                Voulez-vous vraiment réinitialiser... ?
              </Typography>
            </Box>
          </React.Fragment>
        );
      case "Paiement dette":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: "200px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "45px",
              }}
            >
              <Typography>
                le client
                <span style={{ fontWeight: "700" }}>{` ${namePaidDebt} `}</span>
                paye une dette prise <span>{` ${datePaid}`}</span>
              </Typography>
              <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Montant
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Montant"
                  onChange={(e) => {
                    setAmountPaid(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
          </React.Fragment>
        );
      case "Détails de l'utilisateur":
        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: "450px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "45px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  {...stringAvatar("User Avatar")}
                  sx={{ width: "100px", height: "100px" }}
                />
              </Box>
              <Box>
                <List>
                  <ListItem secondaryAction={nameUser}>
                    <ListItemText primary="Username :" />
                  </ListItem>
                  <ListItem
                    secondaryAction={
                      actived === true ? (
                        <p
                          style={{
                            backgroundColor: "#6de78e82",
                            padding: "1px 5px",
                            borderRadius: "4px",
                            textAlign: "center",
                          }}
                        >
                          Activé
                        </p>
                      ) : (
                        <p
                          style={{
                            backgroundColor: "#f7964bb2",
                            padding: "1px 5px",
                            borderRadius: "4px",
                            textAlign: "center",
                          }}
                        >
                          Désactivé
                        </p>
                      )
                    }
                  >
                    <ListItemText primary="Status :" />
                  </ListItem>
                  <ListItem secondaryAction={dateUser}>
                    <ListItemText primary="Date de création :" />
                  </ListItem>
                  <ListItem
                    secondaryAction={
                      admin === false ? "simple utilisateur" : "admin"
                    }
                  >
                    <ListItemText primary="Rôle :" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </React.Fragment>
        );
      case "Changer statuts":
        const handleChange = (event) => {
          setStatus(event.target.value);
        };

        return (
          <React.Fragment>
            <Box
              sx={{
                width: { xs: "310px", sm: "440px" },
                height: "200px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "45px",
              }}
            >
              <Typography>
                l'utilisateur
                <span style={{ fontWeight: "700" }}>{` ${nameUser} `}</span>, ID
                : <span>{` ${idUser}`}</span>
              </Typography>
              <FormControl sx={{ m: 1, margin: "o", width: "50%" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value={false}>Simple utilisateur</MenuItem>
                  <MenuItem value={true}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </React.Fragment>
        );

      default:
        return content;
    }
  };

  return (
    <div>
      <button
        className={styleDialog}
        variant="outlined"
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // border: border,
          color: "none",
          cursor: "pointer",
          border: "none",
          padding: "0",
          margin: "0",
        }}
        onClick={handleClickOpen}
      >
        {actions}
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {DialogTitle}
        </BootstrapDialogTitle>
        {ModelTestDialog(DialogTitle)}
        <Button
          autoFocus
          onClick={handleClickForAll(DialogTitle)}
          sx={{ textTransform: "none" }}
          disabled={isLoading}
        >
          {typeAction}
          {isLoading ? (
            <CircularProgress
              size={24}
              sx={{
                color: "green",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          ) : null}
        </Button>
      </BootstrapDialog>
    </div>
  );
}
