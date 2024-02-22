import { Plus } from 'lucide-react';
import React from 'react'
import { useArchive } from '../../hooks/useArchive';
import Note from '../../containers/UI/Note';

function Home() {
  const {
    onSearch,
    saveArchive,
    results,
    downloadJson,
    importJson,
    removeAll,
    search
  } = useArchive();

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
        <input 
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder='Search...' />
        <button className='delete_all' onClick={removeAll}>
          Delete all
        </button>
      </header>
      <div className='popup_body'>
        
        {results.length > 0 && results.map(arch => (
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