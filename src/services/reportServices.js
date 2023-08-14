import { userAxiosInstance } from "../axios/instance";

export const getProductAndCustomerDetails = () => {
  return userAxiosInstance.get("/getdetailsforsales");
};

export const submitSalesDetails = (data) => {
  return userAxiosInstance.post("/createnewsale", { data: data });
};

export const getItemsReport = () => {
  return userAxiosInstance.get("/getinventoryreport");
};

export const getSalesReport = () => {
  return userAxiosInstance.get("/getsalesreport");
};
