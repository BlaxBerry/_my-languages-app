import axios, { type CreateAxiosDefaults } from "axios";

const getAxiosInstance = (configs: CreateAxiosDefaults) => {
  const instance = axios.create(configs);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        // get Token
        // const newToken = ...
        // window.localStorage.setItem('access_token', newToken);
        // // getCookie
        // const res = await axios
        //   .request({
        //     ...error.config,
        //     headers: {
        //       Authorization: `Bearer ${window.localStorage.getItem(
        //         "access_token",
        //       )}`,
        //     },
        //   })
        //   .catch((err) => {
        //     window.location.href = "/";
        //   });
        // return res;
      }
    },
  );

  return instance;
};

/* for specific backend */
export const AxiosInstance = getAxiosInstance({
  baseURL: "https://locahost:8000",
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
  },
  timeout: 3000,
});

/* for others (no need request headers ) */
export const AxiosInstanceOthers = getAxiosInstance({});
