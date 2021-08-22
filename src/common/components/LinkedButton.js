import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonStylesMixin } from './mixins';

export default styled(Link)`
    ${buttonStylesMixin}
`;
