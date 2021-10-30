import { inject, observer } from 'mobx-react';

import './generalInformation.css';

import { GeneralInfoWrapper } from './styles';
import ErrorMessage from '../../../common/components/ErrorMessage';
import GeneralInformationFields from './GeneralInformationFields';
import { PageSubtitle } from '../../../common/components/TitleVariants';


export default inject('registrationStore')(observer(GeneralInformation));

function GeneralInformation({ registrationStore }) {

    const { commonInfo: { birthday, avatar }, error: { generalInfo }, setField } = registrationStore;

    return (
        <>
            <PageSubtitle>Общие данные
                {generalInfo && <ErrorMessage>{generalInfo}</ErrorMessage>}
            </PageSubtitle>

            <GeneralInfoWrapper>

                <GeneralInformationFields
                    onChangeField={setField}
                    birthday={birthday}
                    avatar={avatar}
                />

            </GeneralInfoWrapper>
        </>
    );
};
