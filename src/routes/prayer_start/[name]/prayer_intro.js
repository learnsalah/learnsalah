const data = [
    {
        id: "fajr",
        name: "Fajr",
        timing: "Dawn Prayer",
        img: "/images/fajr.png",
        description: 
        `
        Fajr, performed at dawn, includes two units. 
        It ushers in the day with mindfulness and gratitude.
        `
    },
    { 
        id: 'dhuhr',
        name: 'Dhuhr',
        timing: "Noon Prayer",
        img : "/images/dhuhr.png",
        description : 
        `
        Dhuhr, conducted around noon, has four units. 
        It offers a spiritual 'reset' amid daily activities.
        `
    },
    { 
        id: 'asr',
        name: 'Asr',
        timing: "Afternoon Prayer",
        img : "/images/asr.png",
        description : 
        `
        Asr, performed in the afternoon, comprises four units. 
        It's believed to be a time when prayers are readily answered.
        `
    },
    { 
        id: 'maghrib',
        name: 'Maghrib',
        timing: "Sunset Prayer",
        img : "/images/maghrib.png",
        description : 
        `
        Maghrib, performed at sunset, contains three units. 
        It reminds us to appreciate the day-night transition.
        `
    },
    { 
        id: 'isha',
        name: 'Isha',
        timing: "Night Prayer",
        img : "/images/isha.png",
        description : 
        `
        Isha, conducted at night, consists of four units. 
        It brings a tranquil conclusion to the day.
        `
    }
];

export const prayers = data.reduce((accumulator, item) => {
    return { ...accumulator, [item.id]: item };
}, {});