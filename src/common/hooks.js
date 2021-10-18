import { useEffect, useRef, useState } from 'react'
import { requestWithParams } from '../api/exchangeLayer';

export function useCategoryFilters(initialCategory = null) {
    const [categories, setCategories] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(initialCategory);
    const [filtersByCategory, setFiltersByCategory] = useState(null);

    useEffect(() => {
        requestWithParams('getProfessions').then(data => setCategories(data.options));
    }, [])

    useEffect(() => {
        if (currentCategory) {
            requestWithParams('getFiltersByProfession', { value: currentCategory })
                .then(data => setFiltersByCategory(data.category));
        }
        
    }, [currentCategory])

    return ({ categories, setCurrentCategory, filtersByCategory })
}

export function useToggle(initial = false) {
    const [state, setState] = useState(initial);

    function toggleState(value) {
        value !== undefined ? setState(Boolean(value)) : setState(prev => !prev);
    }

    return [state, toggleState];
}
