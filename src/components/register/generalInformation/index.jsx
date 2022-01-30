import { inject, observer } from 'mobx-react';

import { GeneralInfoWrapper } from './styles';
import ErrorMessage from '../../../common/components/ErrorMessage';
import GeneralInformationFields from './GeneralInformationFields';
import { Subtitle } from '../../../common/components/Typography';
import { DefaultContainer } from '../../../common/components/Layouts';


export default inject('registrationStore')(observer(GeneralInformation));

function GeneralInformation({ error, onChange, birthday, avatar }) {

    return (
        <DefaultContainer>
            <DefaultContainer>
                <Subtitle>Общие данные</Subtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </DefaultContainer>

            <GeneralInfoWrapper>
                <GeneralInformationFields
                    onChange={onChange}
                    birthday={birthday}
                    avatar={avatar}
                />
            </GeneralInfoWrapper>
        </DefaultContainer>
    );
};
