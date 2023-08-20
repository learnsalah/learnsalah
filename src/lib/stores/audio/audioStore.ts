import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = {
    audioRef: null,
    isAudioActive: false,
    playbackSpeed: 1,
    speaker: "audio_1"
};

// Check local storage for existing values or use default values
const initialValue = {
    ...defaultValue,
    speaker: browser ? window.localStorage.getItem("speaker") ?? defaultValue.speaker : defaultValue.speaker
};

const audioStore = writable(initialValue);

audioStore.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('speaker', value.speaker);
  }
});

export default audioStore;
