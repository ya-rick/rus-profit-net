import React from "react";
import './workCluster.css';

export default function WorkCluster({ currentCategory, categories = [], onCategoryChanged }) {

    console.log(currentCategory)
    console.log(categories)

    return(
        <div className='work-cluster'>
            {categories && categories.map(category => <button 
                className={`col-xs-6 col-md-6 col-lg-4 button-work${(category.id === currentCategory ? ' button-work-active' : '')}`}
                onClick={() => onCategoryChanged(category.id)}>
                {category.name}
            </button>)}
        </div>
    );
}