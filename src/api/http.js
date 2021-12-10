import axios from 'axios';

const url = process.env.NODE_ENV === 'development' ? 'https://rusprofinet.com'
    : window.location.origin

export const http = axios.create({
    baseURL: `${url}/api/api.php`,
    method: 'post'
});

http.interceptors.response.use(onSuccess => {
    const data = onSuccess.data[0];

    if (data?.error_type) throw new Error(data.error_type);

    return data;
});
