import axios from "axios";
import store from "@/store";

const api = axios.create({
  baseURL: "/api",
  timeout: 60000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

// API 方法
const auth = {
  login: (data) =>
    api.post("/user/login?RememberMe=true", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),
  register: (data) =>
    api.post("/user/register", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }),
  profile: () => api.get("/user/profile"),
};

const collection = {
  getScore: (formData) =>
    api.post("/score/upload", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }),
};

const oss = {
  getAccess: () => api.get("/alioss/getAccess"),
  getUrl: (url) =>
    api.post("/alioss/getUrl", null, {
      params: { url: url },
    }),
};

const user = {
  getUsers: () =>
    api.get("/user", {
      headers: {
        Accept: "application/json",
      },
    }),
  updateCollectionStatus: (isCollected) =>
    api.put(
      "/user/update/isCollected",
      { isCollected: isCollected },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    ),
};

export { api };

export default {
  auth,
  collection,
  oss,
  user,
};
