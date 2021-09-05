import React from 'react'
import { clamp } from '../utils'
import Input from './Input'

export default function NumberInput ({onChange, min, max, value = 0, ...props}) {

    function setNumber(e) {
        let value = e.target.value

        if (/^\d*$/.test(value)) {
            value = Number(value)

            if (max) {
                value = clamp(min || 0, value, max)
            } else {
                value = Math.max(min || 0, value)
            }

            onChange(value)
        }
    }

    return <Input 
        {...props}
        onChange={setNumber}
        value={value}
    />
}