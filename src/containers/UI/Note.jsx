import React from 'react'
import './note.scss';
import { Link, Trash2 } from 'lucide-react';
import { useArchive } from '../../hooks/useArchive';

function Note({title, url, id}) {
    const {removeArchive} = useArchive();
  return (
    <div className='noteItem'>
      <div className='note_info'>
        <Link size={14} />
        <span className='noteTitle'
        onClick={() => chrome.tabs.create({ url })}>
            {title.substring(0, 40) + (title.length > 40 ? '...' : '')}
        </span>
      </div>
        <Trash2 onClick={() => removeArchive(id)} className='icon_' size={18} />
    </div>
  )
}

export default Note