import Axios from "axios";

const BASE_URL =
  process.env.SERVER_API_URL || "https://go-reminder.vercel.app/api";

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetcher = (url) => axios.get(url).then((res) => res.data);
