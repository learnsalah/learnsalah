
<script lang="ts">

    export let hasActiveAudio : Boolean = false;
    let animateAudioToggleButton : Boolean;

    const toggleAudio = () => {

        // animate button
        animateAudioToggleButton = true;
        setTimeout(() => {
            animateAudioToggleButton = false;
        }, 300);

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
        width: 45px;
        height: 45px;
    }
</style>
