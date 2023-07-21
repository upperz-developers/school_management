import React from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, signup } from "../../controller/app/auth/auth";
import { stateAction } from "../../controller/app/redux/actions/auth.action";

const Login = ({ logIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(false);
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSingup, setPasswordSingup] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const { state } = useLocation();

  const timer = React.useRef();
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  let input = document.getElementsByClassName("match");
  const onSubmitLogin = async () => {
    const { from } = state || {};
    dispatch(stateAction({ isLoading: false, isError: "", isSuccess: "" }));
    if (email === "" || password === "") {
      toast.error("Veillez remplir les champs de textes!");
      return;
    }
    if ((await login(dispatch, navigate, email, password)) !== "") {
      return logIn();
    }

    setPassword("");
    setEmail("");
  };

  const onSubmitSignup = async () => {
    dispatch(stateAction({ isLoading: false, isError: "", isSuccess: "" }));
    if (
      (await signup(dispatch, setLoginPage, emailSignup, passwordSingup)) !== ""
    ) {
      return;
    }

    setPassword("");
    setEmail("");
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="login-container">
      <Box
        sx={{
          // height: "93vh",
          width: "100%",
          borderRadius: "10px 0 0 10px",
        }}
        className="card-login-1"
      >
        <img className="img" src="/image.jpg" alt=" " />
      </Box>
      <div className="stack-login"></div>

      <Box
        sx={{
          // height: "93vh",
          width: "100%",
          borderRadius: "0 10px 10px 0",
        }}
        className="card-login-2"
      >
        <Box
          sx={{
            width: "80%",
          }}
        >
          <div className="title">
            <h1>School managment</h1>
          </div>
          {!loginPage ? (
            <div className="input">
              <div className="input1">
                <label>Email</label>

                <input
                  type="email"
                  id="email"
                  pattern=".+@globex\.com"
                  // size="30"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input1">
                <label>Mot de passe</label>

                <input
                  type="password"
                  id="name"
                  name="name"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  // minlength="4"
                  // maxlength="8"
                  // size="10"
                />
              </div>

              <Button
                variant="contained"
                sx={
                  {
                    // gap: "15px",
                    // width: "100%",
                    // padding: "10px  30px",
                    // backgroundColor: " #01a9f9",
                    // textTransform: "none",
                    // fontFamily: "Montserrat",
                    // borderRadius: "20px",
                    // boxShadow: "none",
                  }
                }
                id="button2"
                onClick={onSubmitLogin}
                disabled={isLoading}
              >
                Log in
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                      fontFamily: "Montserrat, sans-serif",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Button>
              <div className="text-signup">
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  N'avez-vous pas de compte ?
                  <button
                    onClick={() => setLoginPage(true)}
                    style={{
                      fontSize: "12px",
                      padding: "3px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#01a9f9",
                      cursor: "pointer",
                    }}
                  >
                    Créer un compte
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="input">
              <div className="input1">
                <label>Email</label>

                <input
                  type="email"
                  id="email"
                  pattern=".+@globex\.com"
                  // size="30"
                  required
                  value={emailSignup}
                  onChange={(e) => {
                    setEmailSignup(e.target.value);
                  }}
                />
              </div>
              <div className="input1">
                <label>Mot de passe</label>

                <input
                  type="password"
                  id="name"
                  className="match"
                  name="name"
                  required
                  value={passwordSingup}
                  onChange={(e) => {
                    setPasswordSingup(e.target.value);
                  }}
                  // minlength="4"
                  // maxlength="8"
                  // size="10"
                />
              </div>
              <div className="input1">
                <label>Confirmer votre mot de passe</label>

                <input
                  type="password"
                  id="name"
                  className="match"
                  name="name"
                  required
                  value={matchPwd}
                  onChange={(e) => {
                    setMatchPwd(e.target.value);
                  }}
                  // minlength="4"
                  // maxlength="8"
                  // size="10"
                />
              </div>

              <Button
                variant="contained"
                sx={
                  {
                    // gap: "15px",
                    // width: "100%",
                    // padding: "10px  30px",
                    // backgroundColor: " #01a9f9",
                    // textTransform: "none",
                    // fontFamily: "Montserrat",
                    // borderRadius: "20px",
                    // boxShadow: "none",
                  }
                }
                id="button2"
                onClick={onSubmitSignup}
                disabled={isLoading}
              >
                Créer un compte
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                      fontFamily: "Montserrat, sans-serif",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Button>
              <div className="text-signup">
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  N'avez-vous déjà un compte ?
                  <button
                    onClick={() => setLoginPage(false)}
                    style={{
                      fontSize: "12px",
                      padding: "3px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#01a9f9",
                      cursor: "pointer",
                    }}
                  >
                    Connexion
                  </button>
                </p>
              </div>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Login;
