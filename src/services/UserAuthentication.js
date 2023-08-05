import { userAxiosInstance } from "../axios/instance";

export const samleReq = () => {
  return userAxiosInstance.post("/test", { data: "hai" });
};
