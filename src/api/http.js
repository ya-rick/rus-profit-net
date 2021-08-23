import axios from 'axios';

export const http = axios.create({
    baseURL: (process.env.NODE_ENV === 'development' ?
        'https://rusprofinet.dncompany.fun' : 'https://localhost') + '/api/api.php',
    method: 'post'
});

http.interceptors.response.use(onSuccess => {
    const data = onSuccess.data[0];

    if (data.error === true) throw new Error(data.description);

    return data;
});
