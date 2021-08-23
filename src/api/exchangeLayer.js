import { http } from './http';

const httpMethodsTypes = {
    getMainPageData: 'get_page_main',
    getProfessions: 'get_category_to_filters',
    getFiltersByProfession: 'get_filters_by_vacancy',
    getVacancies: 'search_vacancy',
    getResumes: 'search_resume',
}

export const dataSerializer = (method, dataToServer = {}) => {
    const sP = new URLSearchParams();

    for (let [key, value] of Object.entries(dataToServer)) {
        sP.set(key, value);
    }

    sP.set('type', httpMethodsTypes[method]);

    return http('', {
        data: sP
    });
}