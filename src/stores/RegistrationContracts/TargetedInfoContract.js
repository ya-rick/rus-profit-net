import { makeAutoObservable } from 'mobx';

export default class TargetedInfoContract {

    category_global = null;
    experience = 0;
    salary = 0;
    salary_type = null;
    description = '';
    result_cat = [];
    years_with = 18;
    years_to = 60;
    name = '';
    agree = false;

    constructor() {
        makeAutoObservable(this);
    }

}