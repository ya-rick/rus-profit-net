export const validationTypes = {
    length: 'length',
    oneTrueOf: 'oneTrueOf',
    oneNotNullOf: 'oneNotNullOf',
    allNotNull: 'allNotNull',
    toBeEqual: 'toBeEqual'
}

const validationPredicates = {
    [validationTypes.length]: {
        validate: (testables) => (console.log(testables), /^.{6,}$/.test(testables[0])),
        errorMessage: 'Допустимо не менее 6-ти символов в пароле'
    },
    [validationTypes.oneTrueOf]: {
        validate: (testables) => testables.some(el => el === true),
        errorMessage: 'Выберите хотя бы один вариант'
    },
    [validationTypes.oneNotNullOf]: {
        validate: (testables) => testables.some(el => !!el !== false),
        errorMessage: 'Заполните хотя бы одно поле'
    },
    [validationTypes.allNotNull]: {
        validate: (testables) => testables.every(el => !!el !== false),
        errorMessage: 'Заполните все обязательные поля'
    },
    [validationTypes.toBeEqual]: {
        validate: (testables) => testables.every(el => el === testables[0]),
        errorMessage: 'Пароли должны быть идентичными'
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
    console.log(this)
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
