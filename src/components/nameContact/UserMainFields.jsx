import { observer } from 'mobx-react';

import Input from '../../common/components/Input';
import PasswordInput from '../../common/components/PasswordInput';
import { SearchableMultiSelect } from './searchableMultiSelect';


// For comfortable layouts purpose
function UserMainFields({ onChangeField, fieldValues, cityCountryModel }) {

    const {
        user_surname, user_name, user_email, user_password, user_password_confirm
    } = fieldValues;

    const {
        onChangeCities, onChangeCountries, chosenCountries, chosenCities, onChangeActiveEditableCountry,
        currentEditCountry
    } = cityCountryModel;

    return <>
        <div className='name-info-subblock'>
            <p className='name-info-text'>Фамилия*</p>
            <Input
                className='input-reg'
                value={user_surname}
                onChange={e => onChangeField('user_surname')(e.target.value)}/>
        </div>

        <div className='name-info-subblock'>
            <p className='name-info-text'>Имя*</p>
            <Input
                className='input-reg'
                value={user_name}
                onChange={e => onChangeField('user_name')(e.target.value)}/>
        </div>

        <div className='name-info-subblock'>
            <p className='name-info-text'>E-mail*</p>
            <Input
                className='input-reg'
                value={user_email}
                onChange={e => onChangeField('user_email')(e.target.value)}/>
        </div>

        <div className='name-info-subblock'>
            <p className='name-info-text'>Пароль*</p>
            <PasswordInput
                value={user_password}
                onChange={e => onChangeField('user_password')(e.target.value)}/>
        </div>

        <div className='name-info-subblock'>
            <p className='name-info-text'>Подтвердите пароль*</p>
            <PasswordInput
                value={user_password_confirm}
                onChange={e => onChangeField('user_password_confirm')(e.target.value)}/>
        </div>

        <div className='name-info-subblock'>
            <p className='name-info-text'>Выберите страну*</p>
            <SearchableMultiSelect
                onTagClick={(tag) => onChangeActiveEditableCountry(tag)}
                onTagDelete={(tag) => onChangeCountries(tag, 'delete')}
                chosenOptions={chosenCountries}
                requestType={'get_countries'}
                isCountry={true}
                onItemSelected={(tag) => onChangeCountries(tag, 'add')}
                editableCountryID={currentEditCountry?.id}
            />
            <p className='subtext-new'>Вы можете выбрать до 3 стран и/или городов</p>
        </div>

        <div className='name-info-subblock'>
            <p className='name-info-text'>Выберите город</p>
            <SearchableMultiSelect
                onTagClick={() => {}}
                onTagDelete={(tag) => onChangeCities(tag, 'delete')}
                chosenOptions={chosenCities}
                requestType={'get_cities'}
                isCountry={false}
                onItemSelected={(tag) => onChangeCities(tag, 'add')}
                editableCountryID={currentEditCountry?.id}
            />
        </div>
    </>
}

export default observer(UserMainFields);
