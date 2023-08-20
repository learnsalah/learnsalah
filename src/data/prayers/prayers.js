import takbeer from './takbeer';
import istiadhah from './istiadhah';
import alFatihah from './alFatihah';
import alIkhlas from './alIkhlas';
import anNas from './anNas';
import alFalaq from './alFalaq';
import ruku from './ruku';
import qayyam from './qayyam';
import sujood from './sujood';
import sujood2 from './sujood2';
import tashahhud from './tashahhud';
import durood from './durood';
import taslim from './taslim';
import dua_thana from './dua_thana';

const fajr = [
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
    ...taslim
];

const fajr_sunnah_rituals = [
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
    ...alFatihah,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alFatihah,
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
    ...taslim
];

const dhuhr_sunnah_rituals = [
    ...takbeer,
    ...dua_thana,
    ...istiadhah, 
    ...alFatihah,
    ...alIkhlas,
    ...ruku,
    ...qayyam,
    ...sujood,
    ...alFatihah,
    ...anNas,
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
const asr_sunnah_rituals = dhuhr_sunnah_rituals;
const isha = dhuhr;
const isha_sunnah_rituals = dhuhr_sunnah_rituals;

const maghrib = [
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
    ...takbeer,
    ...alFatihah,
    ...ruku,
    ...qayyam,
    ...sujood2,
    ...tashahhud,
    ...taslim
];

const maghrib_sunnah_rituals = [
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
        prayer: {
            bare : fajr,
            sunnah_rituals : fajr_sunnah_rituals
        }
    },
    {
        name : "dhuhr",
        prayer: {
            bare : dhuhr,
            sunnah_rituals : dhuhr_sunnah_rituals
        }
    },
    {
        name : "asr",
        prayer: {
            bare : asr,
            sunnah_rituals : asr_sunnah_rituals
        }
    },
    {
        name : "maghrib",
        prayer: {
            bare : maghrib,
            sunnah_rituals : maghrib_sunnah_rituals
        }
    },
    {
        name : "isha",
        prayer: {
            bare : isha,
            sunnah_rituals : isha_sunnah_rituals
        }
    },

]