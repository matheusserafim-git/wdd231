// Save data in localStorage
export function saveItem(key,value){

    localStorage.setItem(key,JSON.stringify(value));

}

export function getItem(key){

    const data=localStorage.getItem(key);

    return data ? JSON.parse(data) : null;

}

// Remove an item
export function removeItem(key) {
    localStorage.removeItem(key);
}

// Clear all localStorage
export function clearStorage() {
    localStorage.clear();
}