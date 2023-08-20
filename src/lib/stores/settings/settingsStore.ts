import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = {
    sunnahRituals: false,
    sunnahPrayers: false,
    maleFemaleImage: "male" 
};

// Check local storage for existing values or use default values
const initialValue = {
    sunnahRituals: browser ? window.localStorage.getItem("sunnahRituals") ?? defaultValue.sunnahRituals : defaultValue.sunnahRituals,
    sunnahPrayers: browser ? window.localStorage.getItem("sunnahPrayers") ?? defaultValue.sunnahPrayers : defaultValue.sunnahPrayers,
    maleFemaleImage: browser ? window.localStorage.getItem("maleFemaleImage") ?? defaultValue.maleFemaleImage : defaultValue.maleFemaleImage
};

const settingsStore = writable(initialValue);

settingsStore.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('sunnahRituals', value.sunnahRituals.toString());
        window.localStorage.setItem('sunnahPrayers', value.sunnahPrayers.toString());
        window.localStorage.setItem('maleFemaleImage', value.maleFemaleImage);
    }
});

export default settingsStore;
