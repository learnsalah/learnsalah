<script>

    import { createEventDispatcher } from 'svelte';

    export let isAutoPlaying;
    export let animatePlayButton;

    const dispatch = createEventDispatcher();

    const startAutoPlay = () => {
        if (!isAutoPlaying) {

            dispatch("startAutoPlay");

        }
    };


</script>

<div 
class="btn"
on:click={startAutoPlay}
on:keyup={startAutoPlay}
>

    <img 
    class:zoom-in-out-box={animatePlayButton}
    width="50"
    height="50"
    alt="pause"
    src="/icons/play.svg">

</div>