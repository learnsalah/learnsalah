import { writable } from 'svelte/store';

// Define the state variable for the font size of the transliteration
export const fontSizeTransliterationText = writable(10);

// Define the state variable for the audio reference
export const audioRefStore = writable(null);
