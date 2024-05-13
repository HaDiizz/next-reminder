import Axios from "axios";

const BASE_URL = process.env.SERVER_API_URL || "http://localhost:8080/api";

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetcher = (url) => axios.get(url).then((res) => res.data);