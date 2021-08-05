import React from "react";
import './menuDoctorItem.css';

const MenuDoctorItem = (listsData)=>{
    const elements = listsData.listsData.map((item) => {
        const {id,label} = item;
        return (
            <div key={id} className="input-list">
                <input type='checkbox'/>
                <label>{label}</label>
            </div>
        );
    });
    return(
        <div className='doctorMenu'>
            {elements}
        </div>
    );
};

export default MenuDoctorItem;
