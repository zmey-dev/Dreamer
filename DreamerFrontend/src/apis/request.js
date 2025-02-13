import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_ERROR } from "./messages";
import { store } from "../store/store";
import { setUser } from "../store/slices/authSlice";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       store.dispatch(setUser(null));
//     }
//     return Promise.reject(error);
//   }
// );

const handleRequestResponse = (res) => {
  if (res.status >= 200 && res.status < 300 && res.data.message) {
    toast.success(res.data.message);
  } else if (res.status >= 300 && res.data.message) {
    toast.error(res.data.message);
  }
  return res.data;
};

const handleRequestError = (err) => {
  console.log(err);

  const errorData = err?.response?.data;
  if (errorData?.message) {
    toast.error(errorData?.message);
  } else if (!errorData) {
    toast.error(SERVER_ERROR);
  }
  console.log(errorData || err);
  return Promise.reject(errorData || err);
};

export const getRequest = (url, params) => {
  return Axios.get(url, { params })
    .then(handleRequestResponse)
    .catch(handleRequestError);
};

export const postRequest = (url, data) => {
  return Axios.post(url, data)
    .then(handleRequestResponse)
    .catch(handleRequestError);
};

export const putRequest = (url, data) => {
  return Axios.put(url, data)
    .then(handleRequestResponse)
    .catch(handleRequestError);
};

export const deleteRequest = (url, params) => {
  return Axios.delete(`${url}/${params}`)
    .then(handleRequestResponse)
    .catch(handleRequestError);
};
