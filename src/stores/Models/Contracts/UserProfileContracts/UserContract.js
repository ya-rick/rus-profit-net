import { makeAutoObservable } from 'mobx';


export default class UserContract {
    constructor(fromServerUserData = {}) {
        Object.entries(this.basicTemplate)
            .forEach(([key, defaultValue]) => this[key] = fromServerUserData[key] || defaultValue);

        makeAutoObservable(this);
    }

    get basicTemplate() {
        return {
            id: null,
            avatar: null,
            birthday: null,
            contacts_info: [],
            user_name: null,
            user_surname: null,
            user_email: null,
            places: []
        }
    }

}