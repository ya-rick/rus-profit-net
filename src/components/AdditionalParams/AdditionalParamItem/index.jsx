import React, { useState } from 'react';
import styled from 'styled-components';

import CheckBox from '../../../common/components/checkbox';
import Icon from '../../../common/components/Icon';
import { CommonText } from '../../../common/components/Typography';


const MenuNannyItem = ({ listsData, chek, selectedIDs }) => {
    const [isFullSized, setFullSized] = useState(false);

    const elements = (isFullSized ? listsData : listsData.slice(0, 4)).map((item) => {
        const {id, name } = item;
        return (
            <ParamsListItem key={id}>
                <CheckBox isChecked={selectedIDs.includes(id)} check={()=>chek(id)}>
                    <CommonText>{name}</CommonText>
                </CheckBox>
            </ParamsListItem>
        );
    });
    return(
       <ParamsList>
           {elements}
           {listsData.length > 4 && <SpreadButton
                onClick={() => setFullSized(!isFullSized)}
            >
                <CommonText>{isFullSized ? 'Свернуть' : 'Посмотреть все'}</CommonText>
                <ArrowIcon
                    iconName={'arrow_down'}
                    spread={isFullSized}
                />
           </SpreadButton>}
       </ParamsList>
    );
};

export default MenuNannyItem;

const SpreadButton = styled.button`
    display: flex;
    align-items: center;
    color: #153D70;
    background: #F7FBFC;
    padding: .25rem .5rem;
    margin-block-start: .5rem;

    ${props => props.theme.smallBorderRadius}
`;

const ParamsListItem = styled.li`
    list-style: none;
    margin-block-start: .5rem;
`;

const ParamsList = styled.ul`
    margin: 0;
    padding: 0;
`;

const ArrowIcon = styled(Icon)`
    ${props => props.spread && 'transform: rotateX(180deg);'}
    margin-left: 10px;
`;
