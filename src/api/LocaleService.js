import { makeAutoObservable } from 'mobx';
import { requestWithParams } from './exchangeLayer';


let instance = null;

export default class LocaleService {

    error_map;

    constructor() {
        makeAutoObservable(this);
    }

    static getInstance() {
        if (!instance) instance = new LocaleService();

        return instance;
    }

    async loadErrors() {
        let result = await requestWithParams('getErrors');

        this.error_map = result.errors.reduce((res, errorObj) => {
            res[errorObj.error_type] = errorObj.user_message;

            return res;
        }, {});
    }

    getByKey(key) {
        if (!this.error_map.hasOwnProperty(key)) throw new Error(`No such error key ${key}`);

        return this.error_map[key];
    }
}
