<script>

    import { createEventDispatcher } from 'svelte';

    export let isAutoPlaying;
    export let animatePauseButton;

    const dispatch = createEventDispatcher();

    const stopAutoPlay = () => {
        if (isAutoPlaying) {
            dispatch("stopAutoPlay");
        }
    };


</script>

<div 
class="btn"
on:click={stopAutoPlay} 
on:keyup={stopAutoPlay}
>

<img 
class:zoom-in-out-box={animatePauseButton}
width="50"
height="50"
alt="pause"
src="/icons/pause.svg">

</div>