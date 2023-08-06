<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    export let isAutoPlaying : boolean;
    export let animatePlayButton : boolean;
    export let animatePauseButton : boolean;

    const dispatch = createEventDispatcher();

    const toggleAutoPlay = () => {

        if (isAutoPlaying) {
            dispatch("stopAutoPlay");
        }else{
            dispatch("startAutoPlay");
        }
    };


</script>


<div 
class="btn"
on:click={toggleAutoPlay}
on:keyup={toggleAutoPlay}
style="margin-right:15px;"
>
    {#if isAutoPlaying}

        <img 
        class:zoom-in-out-box={animatePauseButton}
        width="50"
        height="50"
        alt="pause"
        src="/icons/pause.svg">
    
    {:else}

        <img 
        class:zoom-in-out-box={animatePlayButton}
        width="50"
        height="50"
        alt="play"
        src="/icons/play.svg">

    {/if}
    
</div>



