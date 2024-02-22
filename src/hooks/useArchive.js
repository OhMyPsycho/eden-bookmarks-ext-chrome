import { useMemo, useState } from "react";
import useArchiveStore from "../stores/archives"
import { v4 as uuidv4 } from 'uuid';
import { set } from "react-hook-form";

export const useArchive = () => {
    const [search, setSearch] = useState('');

    const archives = useArchiveStore(state => state.archives);
    const remove = useArchiveStore(state => state.remove);
    const add = useArchiveStore(state => state.add);
    const syncJson = useArchiveStore(state => state.syncJson);
    const removeAllArchives = useArchiveStore(state => state.removeAll);

    const results = useMemo(() => {
        if(search === '') return archives;
        return archives.filter(archive => archive.title.toLowerCase().includes(search.toLowerCase()));
    }, [archives, search])

    const onSearch = (str) => {
        setSearch(str);
    }

    const downloadJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(archives));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "bookmarks.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const importJson = async (event) => {
        const file = event.target.files[0];
        console.log(event.target.files[0])
        if(!file) return;

        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const json = JSON.parse(e.target.result);
                // console.log({json})
                syncJson(json)
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        }
        reader.readAsText(file);
        // const data = JSON.parse(json);
        // data.forEach(archive => {
        //     saveArchive(archive.title, archive.url);
        // })
    }

    const saveArchive = async (title, url) => {
        if(url === '' || title === '') return;
        if(archives.find(archive => archive.url === url)) return;
        const newArchive = {
            id: uuidv4(),
            title,
            url,
        }
        add(newArchive);
    }

    const removeArchive = (id) => {
        remove(id)
    }

    const removeAll = () => removeAllArchives()

    return {
        removeArchive,
        saveArchive,
        onSearch,
        downloadJson,
        importJson,
        results,
        removeAll,
        search
    }
}