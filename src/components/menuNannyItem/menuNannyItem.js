import React from "react";
import './menuNannyItem.css';
import CheckBox from "../checkbox";

const MenuNannyItem = ({ listsData, chek, selectedIDs })=>{

    const elements = listsData.map((item) => {
        const {id, name } = item;
        return (
            <div key={id} className="input-list">
                <CheckBox isChecked={selectedIDs.includes(id)} check={()=>chek(id)}>
                    <span  className='p-item'>{name}</span>
                </CheckBox>
            </div>
        );
    });
    return(
       <div>
           {elements}
       </div>
    );
};

export default MenuNannyItem;
