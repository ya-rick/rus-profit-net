import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://rusprofinet.dncompany.fun/api/api.php',
    method: 'post'
});

http.interceptors.response.use(onSuccess => {
    const data = onSuccess.data[0];

    if (data?.error === true) throw new Error(data.description);

    return data;
});
