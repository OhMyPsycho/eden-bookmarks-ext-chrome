import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import './back-header.scss'

function BackHeader() {
  
  return (
    <header className='back-header'>
        <Link to="/">
            <ChevronLeft size={24} />
            <span>Back</span>
        </Link>
    </header>
  )
}

export default BackHeader