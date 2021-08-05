const axios = require('axios');

export default class RegistrationService {
    _apiBase = `https://rusprofinet.dncompany.fun/api/api.php`;
    async login(email, password) {
        const postParams = new URLSearchParams();
        postParams.set('type', 'login');
        postParams.set('email', email);
        postParams.set('password', password);

        let data = {
            error: false ,
            description: ''
        }

        await axios.post(this._apiBase, postParams)
            .then(function (response) {
                data = {
                   error : response.data[0].error,
                   description : response.data[0].description
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        return data;
    };
};