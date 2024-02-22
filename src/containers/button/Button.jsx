import React from 'react'
import './button.scss'
import { Loader2 } from 'lucide-react'

function Button({children, loading, ...props}) {
  return (
    <button className='loading-button' disabled={loading} {...props}>
        {!loading 
        ? <span>{children}</span>
        : <Loader2 className='spinner' />}
    </button>
  )
}

export default Button