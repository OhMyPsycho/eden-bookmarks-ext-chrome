const API_URL = 'https://back-ext-bookmarks.onrender.com';

export const post = async (url, data) => {
    return await new Promise((resolve, reject) => 
    fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => resolve(response.json()))
    .catch(error => reject(error)));
}

export const get = async (url) => {
    return await new Promise((resolve, reject) => 
    fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => resolve(response.json()))
    .catch(error => reject(error)));
}