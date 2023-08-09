
<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let isAutoPlaying : Boolean;
    export let hasActiveAudio : Boolean = false;

    let animateAudioToggleButton : Boolean;

    const toggleAudio = () => {

        // animate button
        animateAudioToggleButton = true;
        setTimeout(() => {
            animateAudioToggleButton = false;
        }, 300);

        // if auto play AND audio is activated, 
        // then we wish to keep the auto play active
        // by static time frame playback (not audio sync playback)
        // so we call the appropriate method
        if (isAutoPlaying && hasActiveAudio) {
            dispatch("triggerStaticTimeFramePlayback")
        }

        if (isAutoPlaying && !hasActiveAudio) {
            dispatch("startAutoPlay")
        }

        // invert state variable
        hasActiveAudio = !hasActiveAudio;
    };

</script>


<div 
class="btn"
on:click={toggleAudio}
on:keyup={toggleAudio}
>
    {#if hasActiveAudio}

        <img
        class:zoom-in-out-box={animateAudioToggleButton}
        alt="audio on/off"
        src="/icons/speaker_off.svg"
        />

    {:else}
        <img
        class:zoom-in-out-box={animateAudioToggleButton}
        alt="audio on/off"
        src="/icons/speaker_on.svg"
        />
    {/if}


</div>

<style>
    img {
        width: 40px;
        height: 40px;
    }
</style>
