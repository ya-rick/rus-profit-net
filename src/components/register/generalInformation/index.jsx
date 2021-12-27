import { inject, observer } from 'mobx-react';

import { GeneralInfoWrapper } from './styles';
import ErrorMessage from '../../../common/components/ErrorMessage';
import GeneralInformationFields from './GeneralInformationFields';
import { Subtitle } from '../../../common/components/Typography';
import { DefaultContainer } from '../../../common/components/Layouts';


export default inject('registrationStore')(observer(GeneralInformation));

function GeneralInformation({ error, onChange, birthday, avatar }) {

    return (
        <>
            <DefaultContainer>
                <Subtitle>Общие данные
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </Subtitle>
            </DefaultContainer>

            <GeneralInfoWrapper>

                <GeneralInformationFields
                    onChange={onChange}
                    birthday={birthday}
                    avatar={avatar}
                />

            </GeneralInfoWrapper>
        </>
    );
};
