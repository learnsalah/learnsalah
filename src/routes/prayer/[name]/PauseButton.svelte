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
width="70"
height="70"
alt="pause"
src="/icons/pause.svg">

</div>