import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_SERVER });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);