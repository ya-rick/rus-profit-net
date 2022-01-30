import styled from 'styled-components';
import { AdditionalText } from './Typography';


const ErrorMessageDiv = styled(AdditionalText)`
    color: #CC363B;
    margin-top: .2rem;
`;

export default function ErrorMessage(props) {
    return (
        <ErrorMessageDiv
            // for identifying in DOM
            className={'error-message'}
            {...props}
        />
    );
}