import { userAxiosInstance } from "../axios/instance";

export const createNewProduct = (product_details) => {
  return userAxiosInstance.post("/createproduct", product_details);
};

export const getAllBasicProductDetails = () => {
  return userAxiosInstance.get("/getproducts");
};

export const getIndividualProductDetails = (prod_id) => {
  return userAxiosInstance.get("/getproductdetails", {
    headers: { prod_id },
  });
};

export const removeASpecificProductFromList = (prod_id) => {
  return userAxiosInstance.post("/removeproduct", { prod_id });
};

export const updateEditedProductDetails = (edited_details) => {
  return userAxiosInstance.post("/updateproduct", edited_details);
};
