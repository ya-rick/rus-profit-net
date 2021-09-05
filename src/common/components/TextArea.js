import styled from 'styled-components';
import { inputMixins } from './mixins';

export default styled.textarea`
    ${inputMixins}
    resize: vertical;
    min-height: 200px;
`;