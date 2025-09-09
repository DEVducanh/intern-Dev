import axios from "axios";

const apiUrl = "http://localhost:3000";

export const apiBase = axios.create({ baseURL: apiUrl });
