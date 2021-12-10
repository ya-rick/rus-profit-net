import { http } from './http';

const httpMethodsTypes = {
    getMainPageData: 'get_page_main',
    getProfessions: 'get_category_to_filters',
    getFiltersByProfession: 'get_filters_by_category',
    getByFilters: 'search',
    create: 'create',
    edit: 'edit',
    delete: 'delete',
    registration: 'registration',
    get404PageData: 'get_page_404',
    getPageLicense: 'get_page_license',
    getPageAdvert: 'get_page_ad',
    getByID: 'get_data',
    getCountries: 'get_countries',
    getCities: 'get_cities',
    getCurrencies: 'get_currencies',
    setAccess: 'set_access_code',
    getUserData: 'get_user_data',
    editUserData: 'edit_user_data',
    favourites: 'get_favorites_by_category',
    views: 'get_views',
    userVacancy: 'get_vacancy_by_user',
    userResume: 'get_resume_by_user',
    changerPasswordUser: 'change_password_user',
    changerEmailUser: 'change_email_user',
    login: 'login',
    logout: 'logout',
    setMark: 'set_mark',
    setToFavourites: 'add_to_favorites',
    changePasswordRecovery: 'change_password_recovery',
    forgotPassword: 'recovery',
    toggleActivation: 'activation',
    getContacts: 'get_contacts_info',
    sendQuestion: 'add_faq',
    getNotifications: 'get_notifications',
    readNotifications: 'read_notifications',
    getFAQs: 'get_faq',
    getErrors: 'get_errors',
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
