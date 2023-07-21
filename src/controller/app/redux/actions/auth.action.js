import { LOADING, LOGIN, USERDATA } from "./auth_type";

const stateAction = ({
  isLoading,
  isSuccess,
  isError,
  newData,
  userData,
  newDataDash,
}) => ({
  type: LOADING,
  payload: { isLoading, isSuccess, isError, newData, userData, newDataDash },
});
const stateDataUser = ({ userData }) => ({
  type: USERDATA,
  payload: { userData },
});

const setUser = (user) => ({
  type: LOGIN,
  payload: user,
});

export { stateAction, setUser, stateDataUser };
