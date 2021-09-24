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
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;

    > * {
        margin: 20px;
        max-width: 300px;
    }
`;
