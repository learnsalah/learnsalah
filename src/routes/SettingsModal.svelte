<script lang="ts">
    import AudioSettings from './SubSettings/AudioSettings.svelte';
    import PrayerSettings from './SubSettings/PrayerSettings.svelte';
	import PrayerTimeSettings from './SubSettings/PrayerTimeSettings.svelte';

    enum SubSettings {
        None,
        PrayerSettings,
        PrayerTimeSettings,
        AudioSettings,
        Languages,
        DarkMode
    };

    let isSubSettingsActive: boolean = false;
    let activeSubSettings: SubSettings = SubSettings.None;

    const switchSubSettings = (subSettings: SubSettings) => {
        isSubSettingsActive = true;
        activeSubSettings = subSettings;
    }

    const goBackToMainMenu = () => {
        isSubSettingsActive = false;
    }
</script>

<div class="menu-container">
    {#if isSubSettingsActive}
        {#if activeSubSettings === SubSettings.PrayerSettings} 
            <PrayerSettings/>
        {:else if activeSubSettings === SubSettings.PrayerTimeSettings}
            <PrayerTimeSettings/>
        {:else if activeSubSettings === SubSettings.AudioSettings}
            <AudioSettings/>
        {/if}
    {:else}
        <hgroup>
            <h2>General Settings</h2>
            <h3>Changes will be preserved.</h3>
        </hgroup>
        <ul class="settings-menu">
            <li><a class="settings-link" on:click={() => switchSubSettings(SubSettings.PrayerSettings)}>Prayer Settings</a></li>
            <li><a class="settings-link" on:click={() => switchSubSettings(SubSettings.PrayerTimeSettings)}>Prayer Time Settings</a></li>
            <li><a class="settings-link" on:click={() => switchSubSettings(SubSettings.AudioSettings)}>Audio Settings</a></li>
            <li><a class="settings-link" on:click={() => switchSubSettings(SubSettings.Languages)}>Languages</a></li>
            <li><a class="settings-link" on:click={() => switchSubSettings(SubSettings.DarkMode)}>Dark Mode</a></li>
        </ul>
    {/if}
</div>



<style>

    .settings-menu {
        padding: 0;
        margin: 0;
        font-size: 1rem;
    }

    .settings-menu li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .settings-link {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 10px 10px 5px;
        border-radius: 5px;
        transition: background-color 0.3s ease; /* Transition effect for hover */
    }

    .settings-link::after {
        content: "";
        display: block;
        height: 0.6rem;
        width: 0.6rem;
        border-right: 3px solid #1095c1;
        border-top: 3px solid #1095c1;
        transform: rotate(45deg);
    }

    .settings-link:hover {
        background-color: #f4f4f4; /* Background color on hover */
    }

    .settings-link:hover::after {
        border-right: 3px solid #166c88; /* Color change on hover */
        border-top: 3px solid #166c88; /* Color change on hover */
    }


</style>