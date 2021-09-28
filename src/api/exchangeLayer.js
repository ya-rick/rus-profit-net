import { http } from './http';

const httpMethodsTypes = {
    getMainPageData: 'get_page_main',
    getProfessions: 'get_category_to_filters',
    getFiltersByProfession: 'get_filters_by_vacancy',
    getVacancies: 'search_vacancy',
    getResumes: 'search_resume',
    registration: 'registration',
    get404PageData: 'get_page_404',
    getPageLicense: 'get_page_license',
    getPageAdvert: 'get_page_ad',
    sendImg: 'test_img',
    getVacancyByID: 'get_vacancy_data',
    getResumeByID: 'get_resume_data',
    getCountries: 'get_countries',
    getCities: 'get_cities',
    getCurrencies: 'get_currencies',
    setAccess: 'set_access_code',
    getUserData: 'get_user_data',
    editUserData: 'edit_user_data',
    changeUserPassword: 'change_password_user',
    login: 'login',
    logout: 'logout',
    setMark: 'set_mark',
    vacancyToFavourites: 'add_vacancy_to_favorites',
    resumeToFavourites: 'add_resume_to_favorites',
    changePassword: 'change_password_recovery',
    forgotPassword: 'recovery'
}

export const requestWithParams = (method, dataToServer = {}) => {
    const data = new URLSearchParams();

    for (let [key, value] of Object.entries(dataToServer)) {
        data.set(key, value);
    }

    data.set('type', httpMethodsTypes[method]);

    return http('', {
        data
    });
}

export const requestWithFormData = (method, dataToServer = {}) => { 
    const data = new FormData();

    for (let [key, value] of Object.entries(dataToServer)) {
        if (key.endsWith('[]')) {
            value.forEach((oneVal) => data.append(key, oneVal))
        } else {
            data.append(key, value);
        }
    }

    data.append('type', httpMethodsTypes[method]);

    return http('', {
        data
    });
}
