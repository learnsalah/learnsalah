<script lang="ts">
    import prayerTimeStore from "$lib/stores/prayerTime/prayerTimeStore";

    let calculationMethod = $prayerTimeStore.calculationMethod;
    let madhab = $prayerTimeStore.madhab;

    const updateCalculationMethod = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        prayerTimeStore.update(currentSettings => ({
            ...currentSettings,
            calculationMethod: target.value
        }));
    };

    const updateMadhab = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        prayerTimeStore.update(currentSettings => ({
            ...currentSettings,
            madhab: target.value
        }));
    };
</script>

<hgroup>
    <h2>Prayer Time Settings</h2>
    <h3>Personalise your prayer time preferences.</h3>    
</hgroup>

<hr>

<hgroup>
    <h6>Calculation Method</h6>
    <h6>Select the calculation method for prayer times</h6>
</hgroup>

<select id="calculation-method" on:change={updateCalculationMethod}>
    <option selected={calculationMethod === 'MuslimWorldLeague'}     value="MuslimWorldLeague">Muslim World League</option>
    <option selected={calculationMethod === 'Egyptian'}              value="Egyptian">Egyptian General Authority of Survey</option>
    <option selected={calculationMethod === 'Karachi'}               value="Karachi">University of Islamic Sciences</option>
    <option selected={calculationMethod === 'UmmAlQura'}             value="UmmAlQura">Umm al-Qura University</option>
    <option selected={calculationMethod === 'Dubai'}                 value="Dubai">Dubai</option>
    <option selected={calculationMethod === 'MoonsightingCommittee'} value="MoonsightingCommittee">Moonsighting Committee</option>
    <option selected={calculationMethod === 'NorthAmerica'}          value="NorthAmerica">ISNA North America</option>
    <option selected={calculationMethod === 'Kuwait'}                value="Kuwait">Kuwait</option>
    <option selected={calculationMethod === 'Qatar'}                 value="Qatar">Qatar</option>
    <option selected={calculationMethod === 'Singapore'}             value="Singapore">Singapore</option>
    <option selected={calculationMethod === 'Tehran'}                value="Tehran">University of Tehran</option>
    <option selected={calculationMethod === 'Turkey'}                value="Turkey">Dianet Turkey</option>
</select>

<hr style="margin-top:20px">

<hgroup>
    <h6>Madhab</h6>
    <h6>Select the Madhab (school of thought) for prayer calculation</h6>
</hgroup>

<select id="madhab" on:change={updateMadhab}>
    <option selected={madhab === 'shafi'}  value="shafi">Shafi</option>
    <option selected={madhab === 'hanafi'} value="hanafi">Hanafi</option>
</select>
