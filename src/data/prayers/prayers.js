import takbeer from './takbeer';
import alqayyam_istiadhah from './alqayyam_istiadhah';
import alqayyam_alFatihah from './alqayyam_alFatihah';
import alqayyam_alIkhlas from './alqayyam_alIkhlas';
import ruku from './ruku';
import qayyam from './qayyam';
import sujood from './sujood';
import sujood2 from './sujood2';
import alqayyam_alFalaq from './alqayyam_alFalaq';
import tashahhud from './tashahhud';
import durood from './durood';
import taslim from './taslim';
import dua_thana from './dua_thana';

const fajr = [
    ...takbeer,
    ...dua_thana,
    ...alqayyam_istiadhah, 
    ...alqayyam_alFatihah,
    ...alqayyam_alIkhlas,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alqayyam_alFatihah,
    ...alqayyam_alFalaq,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...durood,
    ...taslim
];

const dhuhr = [
    ...takbeer,
    ...dua_thana,
    ...alqayyam_istiadhah, 
    ...alqayyam_alFatihah,
    ...alqayyam_alIkhlas,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alqayyam_alFatihah,
    ...alqayyam_alFalaq,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...alqayyam_alFatihah,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alqayyam_alFatihah,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...durood,
    ...taslim
];

const asr = dhuhr;
const isha = dhuhr;

const maghrib = [
    ...takbeer,
    ...dua_thana,
    ...alqayyam_istiadhah, 
    ...alqayyam_alFatihah,
    ...alqayyam_alIkhlas,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alqayyam_alFatihah,
    ...alqayyam_alFalaq,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...alqayyam_alFatihah,
    ...takbeer,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...durood,
    ...taslim
];

export const prayers = [
    {
        name : "fajr",
        prayer: fajr
    },
    {
        name : "dhuhr",
        prayer: dhuhr
    },
    {
        name : "asr",
        prayer: asr
    },
    {
        name : "maghrib",
        prayer: maghrib
    },
    {
        name : "isha",
        prayer: isha
    },

]