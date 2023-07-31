<script lang="ts">

    import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
    import { onMount } from 'svelte';

    export let prayerTimes = null;

    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let latitude, longitude;
    let errorMessage = "";

    onMount(() => {
        // Check if permissions API is supported
        if (!navigator.permissions) {
            errorMessage = "Permissions API not supported";
            return;
        }

        navigator.permissions.query({name: 'geolocation'})
            .then((permissionStatus) => {

                if (permissionStatus.state === 'granted') {
                    getPrayerTimes();
                }

            });

    });

    const getPrayerTimes = () => {

        // request the user's location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                // calculate the prayer times
                const coordinates = new Coordinates(latitude, longitude);
                const params = CalculationMethod.MuslimWorldLeague();
                const date = new Date();  // get current date
                prayerTimes = new PrayerTimes(coordinates, date, params);

            }, () => {
                errorMessage = "Error obtaining geolocation";
            });
        } else {
            errorMessage = "Geolocation is not available";
        }
    }


</script>

{#if prayerTimes === null}
    <a 
    href="#"
    on:click={getPrayerTimes}
    on:keyup={getPrayerTimes}
    >
        <svg 
        width="17" height="17"
        viewBox="0 0 24 24" fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        stroke="#1095c1" stroke-width="0.3">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.925 1.78443C21.5328 1.18151 23.1029 2.75156 22.5 4.35933L16.0722 21.5C15.3574 23.4061 12.5838 23.1501 12.23 21.1453L10.8664 13.418L3.1391 12.0544C1.13427 11.7006 0.878261 8.92697 2.78443 8.21216L19.925 1.78443ZM20.6273 3.65708L3.48668 10.0848L11.2139 11.4485C12.0417 11.5945 12.6898 12.2426 12.8359 13.0704L14.1996 20.7977L20.6273 3.65708Z" 
                fill="#1095c1">
                </path> 
        </svg>
        Get Prayer times
    </a>
{:else}

    <a
    href="#">

        <svg 
        width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#1095c1" stroke-width="2.5"/>
            <path d="M12 8V12L14.5 14.5" stroke="#1095c1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        {timeZone}

    </a>

    {errorMessage}


{/if}

<style>
    svg {
        margin-right: 5px;
    }

    a {
        display: flex;
        align-items: center;
        width: fit-content;
    }
</style>