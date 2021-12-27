import { useEffect, useLayoutEffect, useState } from 'react'

import { requestWithParams } from '../api/exchangeLayer';
import LocaleService from '../api/LocaleService';


let localeService = LocaleService.getInstance();

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
                const eType = e.message;

                setResult(null);
                setError(localeService.getByKey(eType));
                onError && onError(eType);
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

export const breakPoints = {
    // < 640
    S: 'S',
    // >= 640
    M: 'M',
    // >= 1080
    L: 'L',
    // >= 1580
    XL: 'XL',
}
const sizeMapping = {
    [breakPoints.S]: 320,
    [breakPoints.M]: 640,
    [breakPoints.L]: 1080,
    [breakPoints.XL]: 1580,
}
export function useImperativeBreakPoint() {
    function getBreakPointByWidth(currentWidth) {
        if (currentWidth >= 1580) return breakPoints.XL;
        if (currentWidth >= 1080) return breakPoints.L;
        if (currentWidth >= 640) return breakPoints.M;
        
        return breakPoints.S;
    }
    
    const [currentBreakPoint, setCurrentBreakPoint] = useState(() => getBreakPointByWidth(window.innerWidth));

    console.log(currentBreakPoint)

    function isCurrentMoreOrEqualThan(necessaryBreakPoint) {
        return sizeMapping[currentBreakPoint] >= sizeMapping[necessaryBreakPoint];
    }
    
    useEffect(() => {
        function resizeHandler() {
            const newBreakPoint = getBreakPointByWidth(window.innerWidth);

            if (currentBreakPoint !== newBreakPoint) {
                setCurrentBreakPoint(newBreakPoint);
            }
        }

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    });

    return { currentBreakPoint, isCurrentMoreOrEqualThan };
}
