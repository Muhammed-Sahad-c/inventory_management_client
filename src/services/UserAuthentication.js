import { userAxiosInstance } from "../axios/instance";

export const validateLoginDetails = (formData) => {
  return userAxiosInstance.get("/login", { headers: formData });
};

export const getUserDetails = () => {
  return userAxiosInstance.get("/getuserdetails");
};

