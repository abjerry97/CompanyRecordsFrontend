import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "withcredentials":"false",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials":"true",
    'Content-Type': 'application/json',
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Authorization": `Bearer ${localStorage.getItem("idToken")}`,
  },
});
