import styled from 'styled-components';

import { FlyingButton } from '../../common/components/Buttons';


export default function WorkCluster({ currentCategory, categories = [], onCategoryChanged }) {
    return(
        <WorkClusterContainer className='work-cluster'>
            {categories && categories.map(category => <FlyingButton
                active={category.id === currentCategory?.id}
                onClick={() => onCategoryChanged(category)}>
                {category.name}
            </FlyingButton>)}
        </WorkClusterContainer>
    );
}

const WorkClusterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    > * {
        flex: 1 1 max-content;
        max-width: 20ch;
    }
`;
