import axios from 'axios';

var baseUrl = "http://localhost:5000/api"
if (process.env.NODE_ENV === "production") baseUrl = "https://commentpilgrim/api"

let headers = {
  Accept: "application/json",
};

const axiosConfiguration = {
  baseURL: baseUrl,
  timeout: 31000,
  headers: headers,
  withCredentials: true
}

// const api = axios.create({
//   baseURL: baseUrl,
// });

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