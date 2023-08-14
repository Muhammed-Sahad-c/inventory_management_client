import { userAxiosInstance } from "../axios/instance";

export const submitCustomerDetails = (details) => {
  return userAxiosInstance.post("/createcustomer", {
    customer_details: details,
  });
};

export const getCustomerList = () => {
  return userAxiosInstance.get("/getcustomerlist");
};
