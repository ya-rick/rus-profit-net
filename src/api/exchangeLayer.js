import { http } from './http';

const httpMethodsTypes = {
    getMainPageData: 'get_page_main',
    getProfessions: 'get_category_to_filters',
    getFiltersByProfession: 'get_filters_by_vacancy',
    getVacancies: 'search_vacancy',
    getResumes: 'search_resume',
    registerQuestionary: 'registration_resume',
    sendImg: 'test_img'
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
        data.append(key, value);
    }

    data.append('type', httpMethodsTypes[method]);

    return http('', {
        data
    });
}
