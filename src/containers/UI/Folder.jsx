import { Link } from 'lucide-react'
import React from 'react'
import './folder.scss'

function Folder({open = false, name}) {
  return (
    <button className='folder-component'>
        <Link size={18} />
        <span>{name}</span>
    </button>
  )
}

export default Folder