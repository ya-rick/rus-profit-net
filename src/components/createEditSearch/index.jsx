import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { DefaultContainer } from '../../common/components/Layouts';
import { MainSubtitle } from '../../common/components/Typography';

import { ACTIONS } from '../../stores/CreateEditStore';
import TargetInformation from '../register/targetInformation';


export default inject('createEditStore')(observer(function CreateEditSearch({
    createEditStore
}) {

    const {
        currentTemplate, setField, error, sendData, currentAction
    } = createEditStore;

    if (!currentAction) return <Redirect to={'/profile/userInfo'}/>

    return <>
        <DefaultContainer>
            <MainSubtitle>
                {`${currentAction === ACTIONS.UPDATE ?
                    'Редактирование' : 'Создание'} ${createEditStore.isResume ?
                        'анкеты' : 'вакансии'}`}
            </MainSubtitle>
        </DefaultContainer>

        <TargetInformation
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
