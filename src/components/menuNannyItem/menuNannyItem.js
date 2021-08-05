import React from "react";
import './menuNannyItem.css';

const MenuNannyItem = (listsData)=>{
    const elements = listsData.listsData.map((item) => {
        const {id,label} = item;
        return (
            <div key={id} className="input-list col-xs-12 col-md-12 col-lg-6">
                <input type='checkbox'/>
                <label>{label}</label>
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
