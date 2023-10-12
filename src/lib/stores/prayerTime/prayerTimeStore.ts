import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import { CalculationMethod, Madhab } from 'adhan';


const defaultValue = {
    calculationMethod: CalculationMethod.MuslimWorldLeague.name,
    madhab: Madhab.Hanafi
};

// Check local storage for existing values or use default values
const initialValue = {
    calculationMethod: browser ? window.localStorage.getItem("calculationMethod") ?? defaultValue.calculationMethod : defaultValue.calculationMethod,
    madhab: browser ? window.localStorage.getItem("madhab") ?? defaultValue.madhab : defaultValue.madhab
};

const prayerTimeStore = writable(initialValue);

prayerTimeStore.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('calculationMethod', value.calculationMethod);
        window.localStorage.setItem('madhab', value.madhab);
    }
});

export default prayerTimeStore;
