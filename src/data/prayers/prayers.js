import takbeer from './takbeer';
import istiadhah from './istiadhah';
import alFatihah from './alFatihah';
import alIkhlas from './alIkhlas';
import ruku from './ruku';
import qayyam from './qayyam';
import sujood from './sujood';
import sujood2 from './sujood2';
import alFalaq from './alFalaq';
import tashahhud from './tashahhud';
import durood from './durood';
import taslim from './taslim';
import dua_thana from './dua_thana';

const fajr = [
    ...takbeer,
    ...dua_thana,
    ...istiadhah, 
    ...alFatihah,
    ...alIkhlas,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alFatihah,
    ...alFalaq,
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
    ...istiadhah, 
    ...alFatihah,
    ...alIkhlas,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alFatihah,
    ...alFalaq,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...takbeer,
    ...alFatihah,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alFatihah,
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
    ...istiadhah, 
    ...alFatihah,
    ...alIkhlas,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alFatihah,
    ...alFalaq,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...takbeer,
    ...alFatihah,
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