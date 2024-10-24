import axios from "axios";
import * as utils from "utils/web3Utils";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const _isAddress = (address: string) => {
  return utils.isAddress(address);
};

const _parse = (item: any) => {
  if (!item) return item;

  if (typeof item === "string") {
    try {
      item = JSON.parse(item);
    } catch (error) {
      return item;
    }
  }

  const keys = Object.keys(item);

  keys.forEach((key) => {
    if (key.toLowerCase().includes("address")) {
      if (item[key] && !_isAddress(item[key])) {
        console.error("You have entered an invalid address");
      }
      item[key] = item[key]?.toLowerCase();
    }
  });

  return item;
};

const _getAccessToken = () => {
  const token = localStorage.getItem("session.token");

  if (!token) return null;
  return `Bearer ${token}`;
};

const customAxios = (contentType?: string) => {
  const accessToken = _getAccessToken();
  const config = {
    baseURL: API_URL,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: accessToken,
    },
  };

  const instance = axios.create(config);

  instance.interceptors.request.use((config) => {
    const { data, params } = config;
    config.data = _parse(data);
    config.params = _parse(params);
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
   
      if (response.data.status === 401) {
        window.dispatchEvent(new Event("logout"));
      } else if (response.data.status === 400) {
        return Promise.reject(response.data);
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        window.dispatchEvent(new Event("logout"));
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const customAxiosLocalTest = (contentType?: string) => {
  const config = {
    baseURL: "http://localhost:4000/api",
    headers: {
      "Content-Type": contentType || "application/json",
    },
  };

  const instance = axios.create(config);

  instance.interceptors.request.use((config) => {
    const { data, params } = config;
    config.data = _parse(data);
    config.params = _parse(params);
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      if (response.data.status === 401) {
        window.dispatchEvent(new Event("logout"));
      } else if (response.data.status === 400) {
        return Promise.reject(response.data);
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        window.dispatchEvent(new Event("logout"));
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const customAxiosTelegram = (contentType?: string) => {
  const accessToken = _getAccessToken();
  const config = {
    baseURL: API_URL,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: accessToken,
    },
  };

  const instance = axios.create(config);

  instance.interceptors.request.use((config) => {
    const { data, params } = config;
    config.data = _parse(data);
    config.params = _parse(params);
    return config;
  });
  return instance;
};


export default customAxios;
