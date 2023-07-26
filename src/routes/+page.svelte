<script lang="ts">

    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
	import PrayerTimeIndicator from './PrayerTimeIndicator.svelte';
	import PrayerStartButton from './PrayerStartButton.svelte';
	import LocationButton from './LocationButton.svelte';

    let prayerTimes = null;

</script>


<Header/>

<main class="container">

    <div>
        <div style="display:inline-flex;">
            <PrayerStartButton prayer="fajr" />

            {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.fajr}/>
            {/if}
        </div>
    </div>

    <div>
        <div style="display:inline-flex;">
            <PrayerStartButton prayer="dhuhr" />
            {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.dhuhr}/>
            {/if}
        </div>
    </div>

    <div>
        <div style="display:inline-flex;">
            <PrayerStartButton prayer="asr" />
            {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.asr}/>
            {/if}
        </div>
    </div>

    <div>
        <div style="display:inline-flex;">
            <PrayerStartButton prayer="maghrib" />
            {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.maghrib}/>
            {/if}
        </div>
    </div>

    <div>
        <div style="display:inline-flex;">
            <PrayerStartButton prayer="isha" />
            {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.isha}/>
            {/if}

        </div>
    </div>

    <LocationButton bind:prayerTimes={prayerTimes}/>

</main>


<Footer/>
