import axios from "axios";
import { updateToken } from "../util/updateToken";

const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${updateToken()}`,
};

export const APIUser = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  headers: APIHeaders,
  timeout: 60000,
});
