import React from "react";
import './workCluster.css';

export default function WorkCluster({ currentCategory, categories = [], onCategoryChanged }) {

    return(
        <div className='work-cluster'>
            {categories && categories.map(category => <button 
                className={`col-xs-6 col-md-6 col-lg-4 button-work${(category.id === currentCategory?.id ? ' button-work-active' : '')}`}
                onClick={() => onCategoryChanged(category)}>
                {category.name}
            </button>)}
        </div>
    );
}