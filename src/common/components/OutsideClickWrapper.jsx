import { useEffect, useRef } from 'react';


export default function OutsideClickWrapper({ onOutsideClickHandler, children }) {
    const childRef = useRef(null);

    useEffect(() => {

        const windowListener = window.addEventListener(
            'click',
            e => !childRef?.current?.contains(e.target) && onOutsideClickHandler()
        )

        return () => window.removeEventListener('click', windowListener);

    }, [])

    return children(childRef);
}