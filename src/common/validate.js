import LocaleService from '../api/LocaleService';


let localeService = LocaleService.getInstance();

export const validationTypes = {
    length: 'length',
    oneTrueOf: 'oneTrueOf',
    oneNotNullOf: 'oneNotNullOf',
    allNotNull: 'allNotNull',
    toBeEqual: 'toBeEqual',
    arrayLength: 'arrayLength'
}

const validationPredicates = {
    [validationTypes.length]: {
        validate: (testables) => /^[a-zA-Z]{6,}$/.test(testables[0]),
        errorMessage: localeService.getByKey('password_invalid')
    },
    [validationTypes.arrayLength]: {
        validate: (testables) => testables.length > 0,
        errorMessage: localeService.getByKey('city_profession')
    },
    [validationTypes.oneTrueOf]: {
        validate: (testables) => testables.some(el => el === true),
        errorMessage: localeService.getByKey('at_least_one_variant')
    },
    [validationTypes.oneNotNullOf]: {
        validate: (testables) => testables.some(el => !!el !== false),
        errorMessage: localeService.getByKey('at_least_one_field')
    },
    [validationTypes.allNotNull]: {
        validate: (testables) => testables.every(el => !!el !== false),
        errorMessage: localeService.getByKey('all_fields')
    },
    [validationTypes.toBeEqual]: {
        validate: (testables) => testables.every(el => el === testables[0]),
        errorMessage: localeService.getByKey('password_equals')
    }
}

export function bindValidator({stateScope, validationType, errorByKey, fieldKeys}) {
    return (function validate() {
        if (!validationPredicates[validationType]
                .validate(fieldKeys.map(fieldKey => this.state[stateScope][fieldKey]))) {
            return {
                [errorByKey]: validationPredicates[validationType].errorMessage
            };
        }

        return null;
    }).bind(this);
}

export function getErrorMessage(errorByKey) {
    if (!errorByKey) return this.state.errors || {};

    return this.state.errors ? 
        this.state.errors[errorByKey]
        : null;
    ;
}

export function validateAll(...validators) {
    return validators.reduce((acc, validator) => {
        const result = validator();

        if (result) {
            acc || (acc = {});
            acc = {...acc, ...result}
        };

        return acc;
    }, null);
}
