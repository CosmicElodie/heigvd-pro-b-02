import { useState } from 'react';

/*
    input hook to be used on all input fields to keep track of state
    for example see the usage in : layout/SignInSide.js
*/

export const useInput = data => {
    const [value, setValue] = useState(data);
    
    return {
        value, 
        setValue,
        reset: () => setValue(""),
        bind:{
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    }

}