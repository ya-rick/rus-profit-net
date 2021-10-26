// import { useState } from 'react';
import styled from 'styled-components';

import { FlyingButton } from '../../common/components/Buttons';


export default function WorkCluster({ currentCategory, categories, onCategoryChanged }) {
    // const [showMore, setShowMore] = useState(false);

    return <WorkClusterContainer>
        {categories?.map(category => <FlyingButton
            active={category.id === currentCategory?.id}
            onClick={() => onCategoryChanged(category)}>
            {category.name}
        </FlyingButton>)}
    </WorkClusterContainer>
};

const WorkClusterContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;

    margin-bottom: 20px;
`;
