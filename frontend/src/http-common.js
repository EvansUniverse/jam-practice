import axios from "axios";
import { defaultHeaders } from "./helpers/default-headers"

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST || "localhost";
const REACT_APP_API_PORT = process.env.REACT_APP_API_PORT || "8080";
   
export default axios.create({
  baseURL: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}/api`,
  headers: defaultHeaders
});