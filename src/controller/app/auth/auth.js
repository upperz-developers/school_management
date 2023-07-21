import axios from "axios";
import { toast } from "react-toastify";
import { setUser, stateAction } from "../redux/actions/auth.action";

let Error = "";
export const signup = async (
  dispatch,
  setLoginPage,
  emailSignup,
  passwordSingup
) => {
  dispatch(stateAction({ isLoading: true, isSuccess: "", isError: "" }));
  try {
    const results = await axios.post(
      `https://api-expense-management.upper-z.dev/api/v1/log/create`,
      { email: emailSignup, password: passwordSingup }
    );
    dispatch(
      stateAction({
        isLoading: false,
        isSuccess: results.data.message,
        isError: "",
      })
    );
    toast.success(results.data.message);

    localStorage.setItem(
      "email",
      JSON.stringify(results.data && results.data.maessage)
    );
    setLoginPage(false);
    return Error;
  } catch (error) {
    const messageError =
      (error.response && error.response.data && error.response.data) ||
      error.message ||
      error.toString();

    localStorage.removeItem("email");
    dispatch(
      stateAction({ isLoading: false, isSuccess: "", isError: messageError })
    );

    toast.error(messageError.message);
    Error = messageError;
    return Error;
  }
};
export const login = async (dispatch, navigate, email, password) => {
  dispatch(stateAction({ isLoading: true, isSuccess: "", isError: "" }));
  try {
    const results = await axios.post(
      `https://api-community.upper-z.com/api/v1/user/login`,
      {
        email,
        password,
      }
    );
    dispatch(setUser(results.data));
    localStorage.setItem("email", JSON.stringify(results.data));
    navigate("/main");
    dispatch(
      stateAction({
        isLoading: false,
        isSuccess: results.data.user.email,
        isError: "",
      })
    );

    return Error;
  } catch (error) {
    const messageError =
      (error.response && error.response.data && error.response.data) ||
      error.message ||
      error.toString();
    localStorage.removeItem("email");
    dispatch(stateAction({ isLoading: false, isError: messageError }));
    Error = messageError;
    toast.error(messageError.message);
    return Error;
  }
};

export const loginout = async (dispatch, navigate) => {
  dispatch(stateAction({ isLoading: true, isSuccess: "", isError: "" }));
  const tokenData = JSON.parse(localStorage.getItem("email"));
  try {
    const results = await axios.get(
      `https://api-expense-management.upper-z.dev/api/v1/log/logout`,

      {
        headers: {
          Authorization: `Bearer ${tokenData.token.token}`,
        },
      }
    );
    localStorage.removeItem("email");
    dispatch(setUser({ user: null }));
    dispatch(
      stateAction({
        isLoading: false,
        isSuccess: results.maessage,
        isError: "",
      })
    );

    navigate("/", { replace: true });
    return Error;
  } catch (error) {
    const messageError =
      (error.response && error.response.data && error.response.data) ||
      error.message ||
      error.toString();
    // localStorage.removeItem("email");
    toast.error(messageError);
    console.log(tokenData.token.token);
    dispatch(
      stateAction({
        isLoading: false,
        isSuccess: "",
        isError: messageError,
      })
    );
    Error = messageError;
    return Error;
  }
};
