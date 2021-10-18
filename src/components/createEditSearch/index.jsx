import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { ACTIONS } from '../../stores/CreateEditStore';
import RegisterVacancy from '../registerVacancies';
import { ContentTitle } from '../userProfile';


export default inject('createEditStore')(observer(function CreateEditSearch({
    createEditStore
}) {

    const {
        currentTemplate, setField, error, sendData, currentAction
    } = createEditStore;

    if (!currentAction) return <Redirect to={'/profile/userInfo'}/>

    return <>
        <ContentTitle>{currentAction === ACTIONS.UPDATE ? 'Редактирование' : 'Создание'} {createEditStore.isResume ? 'анкеты' : 'вакансии'}</ContentTitle>

        <RegisterVacancy
            onFieldChange={setField}
            fields={currentTemplate}
            error={error}
            onConfirmClicked={sendData}
            isResume={createEditStore.isResume}
            successMessage={{
                title: 'Спасибо!',
                description: `Ваша ${createEditStore.isResume ? 'анкета' : 'вакансия'} направлена на рассмотрение модератору и будет опубликована в течении 24 часов`
            }}
        />
    </>
}));
