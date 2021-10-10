import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import PageTitle from '../../common/components/PageTitle';
import { ACTIONS } from '../../stores/CreateEditStore';
import RegisterVacancy from '../registerVacancies';


export default inject('createEditStore')(observer(function CreateEditSearch({
    createEditStore
}) {

    const {
        currentTemplate, setField, error, sendData, currentAction
    } = createEditStore;

    if (!currentAction) return <Redirect to={'/profile/userInfo'}/>

    return <>
        <PageTitle>{currentAction === ACTIONS.UPDATE ? 'Редактирование' : 'Создание'} {createEditStore.isResume ? 'анкеты' : 'вакансии'}</PageTitle>

        <RegisterVacancy
            onFieldChange={setField}
            fields={currentTemplate}
            error={error}
            onConfirmClicked={sendData}
            isResume={createEditStore.isResume}
            successMessage={{
                title: 'Поздравляю!',
                description: 'В ближайшее время ваш запрос будет рассмотрен администратором'
            }}
        />
    </>
}));
