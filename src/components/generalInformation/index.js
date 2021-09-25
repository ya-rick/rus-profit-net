import { inject, observer } from 'mobx-react';

import './generalInformation.css';

import { GeneralInfoWrapper } from './styles';
import ErrorMessage from '../../common/components/ErrorMessage';
import GeneralInformationFields from './GeneralInformationFields';


export default inject('registrationStore')(observer(GeneralInformation));

function GeneralInformation({ registrationStore }) {

    const { commonInfo: { birthday, image }, error: { generalInfo }, setField } = registrationStore;

    return (
        <>
            <h2 className='register-title'>Общие данные
                {generalInfo && <ErrorMessage>{generalInfo}</ErrorMessage>}
            </h2>
            
            <GeneralInfoWrapper>
                
                <GeneralInformationFields
                    onChangeField={setField}
                    birthday={birthday}
                    image={image}
                />
                
            </GeneralInfoWrapper>
        </>
    );
};
