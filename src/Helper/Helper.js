import axios from "axios";

let adminUrl = "https://apirevveon.com/api";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});

export { adminUrl };
console.log(localStorage.getItem("access_token"));

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (token !== null || token !== undefined) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
