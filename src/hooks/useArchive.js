import { post } from "../libs/api";
import useArchiveStore from "../stores/archives"
import useAuthStore from "../stores/auth";
import { v4 as uuidv4 } from 'uuid';

export const useArchive = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const user = useAuthStore(state => state.user);

    const archives = useArchiveStore(state => state.archives);
    const remove = useArchiveStore(state => state.remove);
    const add = useArchiveStore(state => state.add);
    const syncJson = useArchiveStore(state => state.syncJson);

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

    return {
        archives,
        removeArchive,
        saveArchive,
        isAuthenticated,
        downloadJson,
        importJson,
        user
    }
}