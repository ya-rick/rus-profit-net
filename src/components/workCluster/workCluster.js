import './workCluster.css';


export default function WorkCluster({ currentCategory, categories = [], onCategoryChanged }) {
    return(
        <div className='work-cluster'>
            {categories && categories.map(category => <button 
                className={`button-work${(category.id === currentCategory?.id ? ' button-work-active' : '')}`}
                onClick={() => onCategoryChanged(category)}>
                {category.name}
            </button>)}
        </div>
    );
}