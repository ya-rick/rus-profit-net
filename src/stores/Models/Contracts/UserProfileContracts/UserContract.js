import { makeAutoObservable } from 'mobx';


export default class UserContract {

    id = null;
    avatar = null;
    birthday = null;
    contacts_info = [];
    user_name = null;
    user_surname = null;
    places = [];
    user_email = '';


    constructor(fromServerUserData = {}) {
        const {
            avatar, id, birthday, contacts_info, user_name, user_surname, places, user_email
        } = fromServerUserData;

        this.avatar = avatar;
        this.id = id;
        this.birthday = birthday;
        this.contacts_info = contacts_info;
        this.user_name = user_name;
        this.user_surname = user_surname;
        this.places = places;
        this.user_email = user_email;

        makeAutoObservable(this);
    }

}