import { makeAutoObservable } from 'mobx';


export default class UserContract {

    id = null;
    avatar = null;
    birthday = null;
    contacts_info = [];
    name = null;
    surname = null;
    places = [];


    constructor(fromServerUserData = {}) {
        const {
            avatar, id, birthday, contacts_info, name, surname, places
        } = fromServerUserData;

        this.avatar = avatar;
        this.id = id;
        this.birthday = birthday;
        this.contacts_info = contacts_info;
        this.name = name;
        this.surname = surname;
        this.places = places;

        makeAutoObservable(this);
    }

}