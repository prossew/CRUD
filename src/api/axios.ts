import axios from "axios";

export const api = axios.create({
  baseURL: "https://699ddd3683e60a406a47a10f.mockapi.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});
