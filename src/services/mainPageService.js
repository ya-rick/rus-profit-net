const axios = require('axios');

export default class MainPageService{
    _apiBase = `https://rusprofinet.dncompany.fun/api/api.php`;

    async getMainPage() {
        const postParams = new URLSearchParams();
        postParams.set('type', 'get_page_main');

        return await axios.post(this._apiBase, postParams);
    };
}