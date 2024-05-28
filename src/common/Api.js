import axios from 'axios';
import { Buffer } from 'buffer';
const CryptoJS = require('crypto-js')

var baseUrl = "http://localhost:8080/api"
if (process.env.NODE_ENV === "production") baseUrl = "https://commentpilgrim.com/api"

let headers = {
  Accept: "application/json",
};

const axiosConfiguration = {
  baseURL: baseUrl,
  timeout: 31000,
  headers: headers,
  withCredentials: true
}

const api = axios.create(axiosConfiguration)

export const getYoutubeVideoData = async (videoId) => {
  try {
    const response = await api.get(`/comments?video_id=${videoId}`);
    return response.data;
  } catch (error) {
    return false
  }
};

export const getBasicVideoInformation = async (videoId) => {
  try {
    const response = await api.get(`/video-check?video_id=${videoId}`);
    return response.data;
  } catch (error) {
    return false
  }
};

export const getJobLibrary = async () => {
  try {
    const response = await api.get('/library');
    return response.data;
  } catch (error) {
    return false
  }
};

export const registerNewUser = async (payload) => {
  try {
    const response = await api.post('/register', payload);
    return response.data;
  } catch (error) {
    return false
  }
};

export const fetchAuth = async () => {
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    return false
  }
};

export const logout = async () => {
  try {
    const response = await api.get('/logout');
    return response.data;
  } catch (error) {
    return false
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await api.post('/reset-password', payload);
    return response.data;
  } catch (error) {
    console.log(error)
    return false
  }
};

export const requestPasswordReset = async (payload) => {
  try {
    const response = await api.post('/request-password-reset', payload);
    return response.data;
  } catch (error) {
    return false
  }
};

export const login = async (params) => {
  try {
    const b64Pw = Buffer.from(params.password).toString('base64');
    const maskedPassword = CryptoJS.AES.encrypt(b64Pw, process.env.REACT_APP_CRYPTO).toString();
    const payload = {
      emailAddress: params.emailAddress.toLowerCase().trim(),
      password: maskedPassword
    }
    const response = await api.post("/login", payload);
    return response.data;
  } catch (error) {
    return false
  }
};

export const getAccountInformation = async () => {
  try {
    const response = await api.get('/account');
    return response.data;
  } catch (error) {
    return false
  }
};

export const getAccountManagementUrl = async () => {
  try {
    const response = await api.get('/manage-plan-url');
    return response.data;
  } catch (error) {
    return false
  }
};

export const upgradePlan = async (payload) => {
  try {
    const response = await api.post('/upgrade-plan', payload);
    return response.data;
  } catch (error) {
    return false
  }
};