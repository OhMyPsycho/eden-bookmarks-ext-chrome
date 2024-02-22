import { FileJson, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useArchive } from '../../hooks/useArchive';
import Note from '../../containers/UI/Note';

function Home() {
  const {
    isAuthenticated,
    user,
    // getArchives,
    saveArchive,
    archives,
    downloadJson,
    importJson
  } = useArchive();

  useEffect(() => {
    console.log(archives)
  }, [])

  const saveLink = () => {
    
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
  }, tabs => {
    saveArchive(tabs[0].title, tabs[0].url)
  })
  }

  return (
    <div className="popup">
      <header className="popup-header">
        <h4>Bookmarks</h4>
      </header>
      <div className='popup_body'>
        {archives.length > 0 && archives.map(arch => (
          <Note 
          key={arch.id}
          id={arch.id}
          title={arch.title}
          url={arch.url} />
        ))}
        {/* {archives.map(({id, title, url}) => (<Note key={id} url={url} title={title} />))} */}
      </div>
      <footer className='popup_footer'>
        <div>
          <button className='button_add' onClick={saveLink}>
            <Plus size={16} />
          </button>
        </div>
        <label htmlFor='import' clas>
            <input style={{display: 'none'}} onChange={importJson} id='import' type="file" accept=".json" />
            Import Json
          </label>
          <button className='export_button' onClick={downloadJson}>
            Export Json
        </button>
      </footer>
    </div>
  );
}

export default Home