<script lang="ts">

    import { Coordinates, CalculationMethod, Madhab, PrayerTimes } from 'adhan';
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
                params.madhab = Madhab.Shafi;
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
    on:click={getPrayerTimes}
    on:keyup={getPrayerTimes}
    >
        <img 
        src="/icons/location.svg"
        width="17" height="17"
        alt="location">

        Get Prayer times
    </a>
{:else}

    <a>

    
        <img 
        src="/icons/clock.svg"
        width="17" height="17"
        alt="clock">

        {timeZone}

    </a>

    {errorMessage}


{/if}

<style>
    img {
        margin-right: 5px;
    }

    a {
        display: flex;
        align-items: center;
        width: fit-content;
        border-radius: 5px;
        padding: 5px 5px 5px 0;
        margin-top: 10px;
    }


</style>