import { http } from './http';

const httpMethodsTypes = {
    getMainPageData: 'get_page_main',
    getProfessions: 'get_category_to_filters',
    getFiltersByProfession: 'get_filters_by_vacancy',
    getVacancies: 'search_vacancy',
    getResumes: 'search_resume',
    registerQuestionary: 'registration_resume',
    registerVacancy: 'registration_vacancy',
    get404PageData: 'get_page_404',
    getPageLicense: 'get_page_license',
    getPageAdvert: 'get_page_ad',
    sendImg: 'test_img',
    getVacancyByID: 'get_vacancy_data',
    getResumeByID: 'get_resume_data'
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
