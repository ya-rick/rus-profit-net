const axios = require('axios');

export default class RegistrationService {
    _apiBase = `https://rusprofinet.dncompany.fun/api/api.php`;

    async login(email, password) {
        const postParams = new URLSearchParams();
        postParams.set('type', 'login');
        postParams.set('email', email);
        postParams.set('password', password);

        return await axios.post(this._apiBase, postParams);
    };
};