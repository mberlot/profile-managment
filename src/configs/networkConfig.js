import axios from 'axios';

const api = axios.create({
    baseURL: 'https://randomuser.me',
    timeout: Number(60000)
});

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

export { api };
