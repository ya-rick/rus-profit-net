import { useEffect, useState } from 'react'
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

export function useRequest({ requestType, requestParams, onSuccess, onError }) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    function clearState() {
        setResult(null);
        setError(null);
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await requestWithParams(requestType, requestParams);

                setResult(result);
                setError(null);
                onSuccess && onSuccess(result);
            } catch(e) {
                setResult(null);
                setError(e.message);
                onError && onError(e);
            }
        })();

        return () => clearState();
    }, [requestType]);

    return {
        error, result, isLoading: !Boolean(result || error), transformResult: setResult
    }
}

export function useMetaTags(props) {
    const propertiesNames = ['title', 'description', 'image', 'url'];
    useEffect(() => {
        propertiesNames.forEach(propertyName => {
            let meta = document.querySelector(`meta[property='og:${propertyName}']`);

            if (meta) {
                meta.content = props[propertyName];
            } else {
                meta = document.createElement('meta');
                meta.setAttribute('property', `og:${propertyName}`);
                meta.setAttribute('content', props[propertyName]);

                document.head.appendChild(meta);
            }
        })

    }, [props]);
}
