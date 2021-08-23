import React from "react";
import './menuNannyItem.css';
import CheckBox from "../checkbox";

const MenuNannyItem = ({ listsData, chek, selectedIDs })=>{

    const elements = listsData.map((item) => {
        const {id, name } = item;
        return (
            <div key={id} className="input-list col-xs-12 col-md-12 col-lg-6">
                <CheckBox isChecked={selectedIDs.includes(id)} check={()=>chek(id)}>
                    <p className='p-item'>{name}</p>
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
