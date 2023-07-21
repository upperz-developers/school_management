const BASE_URL = "https://api-expense-management.upper-z.dev/";
const LOGIN_URL = `${URL}api/v1/log/login`;
const CREATE_ENTRY_URL = `${URL}api/v1/flux/create`;
const tokenData = JSON.parse(localStorage.getItem("email"));

const config = {
  headers: {
    Authorization: `Bearer ${tokenData?.token.token}`,
  },
};

export { LOGIN_URL, BASE_URL, config, CREATE_ENTRY_URL };
