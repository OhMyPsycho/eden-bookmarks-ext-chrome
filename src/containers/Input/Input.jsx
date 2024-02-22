import React, { useId } from 'react'
import './input.scss';

function Input({errorMessage, label, ...props}) {
    const id = useId();
  return (
    <div className='input'>
        <label htmlFor={`${id}-${label}`}>{label}</label>
        <input {...props} id={`${id}-${label}`} />
        {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}

export default Input