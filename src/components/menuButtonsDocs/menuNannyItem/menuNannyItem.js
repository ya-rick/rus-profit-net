import React, { useState } from "react";
import './menuNannyItem.css';
import CheckBox from "../../checkbox";
import Icon from "../../../common/components/Icon";
import styled from "styled-components";

const MenuNannyItem = ({ listsData, chek, selectedIDs }) => {
    const [isFullSized, setFullSized] = useState(false);

    const elements = (isFullSized ? listsData : listsData.slice(0, 4)).map((item) => {
        const {id, name } = item;
        return (
            <div key={id} className="input-item">
                <CheckBox isChecked={selectedIDs.includes(id)} check={()=>chek(id)}>
                    <span  className='p-item'>{name}</span>
                </CheckBox>
            </div>
        );
    });
    return(
       <div className="input-list">
           {elements}
           {listsData.length > 4 && <div className={'spread-button-wrapper'}>
                <span
                    className={'spread-button'}
                    onClick={() => setFullSized(!isFullSized)}
                >Посмотреть все</span>
               <ArrowIcon
                    iconName={'arrow_down'}
                    spread={isFullSized}
               />
           </div>}
       </div>
    );
};

export default MenuNannyItem;

const ArrowIcon = styled(Icon)`
    ${props => props.spread && 'transform: rotateX(180deg);'}
    margin-left: 10px;
`;
