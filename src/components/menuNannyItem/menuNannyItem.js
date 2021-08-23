import React from "react";
import './menuNannyItem.css';
import CheckBox from "../checkbox";

const MenuNannyItem = ({listsData, chek})=>{

    const elements = listsData.map((item) => {
        const {id,label, checked} = item;
        return (
            <div key={id} className="input-list col-xs-12 col-md-12 col-lg-6">
                <CheckBox isChecked={checked} check={()=>chek(id)}>
                    <p className='p-item'>{label}</p>
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
