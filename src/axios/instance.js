import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const createAxiosClient = (baseURL) => {
  try {
    const client = axios.create({
      baseURL,
      timeout: 10000,
      timeoutErrorMessage: "request timeout! try again",
    });
    return client;
  } catch (err) {
    return err;
  }
};

const attachToken = (req, tokenName = "inventory_user_token") => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.authorization = `Bearer ${authToken}`;
  }
  return req;
};

export const userAxiosInstance = createAxiosClient(serverUrl);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req);
  return modifiedReq;
});
