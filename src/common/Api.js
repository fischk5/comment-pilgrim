import axios from 'axios';

var baseUrl = "http://localhost:5000/api"
if (process.env.NODE_ENV === "production") baseUrl = "https://commentpilgrim/api"

const api = axios.create({
  baseURL: baseUrl,
});

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