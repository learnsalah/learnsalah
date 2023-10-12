<script lang="ts">
    import settingsStore from "$lib/stores/settings/settingsStore";

    $: sunnahRitualsBoolean = $settingsStore.sunnahRituals === 'true';
    $: sunnahPrayersBoolean = $settingsStore.sunnahPrayers === 'true';
    $: maleFemaleImage = $settingsStore.maleFemaleImage; // 'male' or 'female'

    const toggleSunnahRituals = () => {
        const newValue = sunnahRitualsBoolean ? 'false' : 'true';
        settingsStore.update(currentSettings => ({
            ...currentSettings,
            sunnahRituals: newValue
        }));
    }

    const toggleSunnahPrayers= () => {
        const newValue = sunnahPrayersBoolean ? 'false' : 'true';
        settingsStore.update(currentSettings => ({
            ...currentSettings,
            sunnahPrayers: newValue
        }));
    }

    const setMaleFemaleImage = (event: Event) => {
        const target = event.target as HTMLInputElement;
        settingsStore.update(currentSettings => ({
            ...currentSettings,
            maleFemaleImage: target.value
        }));
    }

</script>

<hgroup>
    <h2>Prayer Settings</h2>
    <h3>Customise your prayer preferences.</h3>    
</hgroup>

<hr>

<hgroup>
    <h6>Sunnah Rituals within Obligatory Prayers</h6>
    <h6>Sunnah rituals are recommended practices performed within obligatory (Fard) prayers.</h6>
</hgroup>

<fieldset>
    <label class="checkboxContainer">
        <span class="checkbox-text">Enable Sunnah Rituals</span>
        <input
        type="checkbox"
        class="styled-checkbox"
        bind:checked={sunnahRitualsBoolean}
        on:change={toggleSunnahRituals}>
    </label>
</fieldset>

<hr style="margin-top:20px">

<hgroup>
    <h6>Sunnah Rak'ahs</h6>
    <h6>Supplementary Sunnah Rak'ahs are performed in addition to the obligatory (Fard) prayers.</h6>
</hgroup>

<fieldset>
    <label class="checkboxContainer">
        <span class="checkbox-text">Enable Sunnah Rak'ahs</span>
        <input
        type="checkbox"
        class="styled-checkbox"
        bind:checked={sunnahPrayersBoolean}
        on:change={toggleSunnahPrayers}>
    </label>
</fieldset>


<hr style="margin-top:20px">

<hgroup>
    <h6>Gender-Specific Prayer Images</h6>
    <h6>Select whether to visualise prayer poses through male or female images.</h6>
</hgroup>

<fieldset>
    <label class="radioContainer">
        <span class="radio-text">Male Images</span>
        <input
        type="radio"
        name="genderImage"
        value="male"
        checked={maleFemaleImage === 'male'}
        on:change={setMaleFemaleImage}>
    </label>
    <label class="radioContainer">
        <span class="radio-text">Female Images</span>
        <input
        type="radio"
        name="genderImage"
        value="female"
        checked={maleFemaleImage === 'female'}
        on:change={setMaleFemaleImage}>
    </label>
</fieldset>

<style>
.checkboxContainer,
.radioContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.radioContainer {
    margin-top: 10px;
}
</style>
