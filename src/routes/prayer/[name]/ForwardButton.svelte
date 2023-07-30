<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let isAutoPlaying : boolean;
    export let currentStageIndex : number;
    export let prayer;

    const nextStage = (manual = false) => {
        // If a user manually triggered nextStage, stop auto play
        if (manual && isAutoPlaying) {
            dispatch('stopAutoPlay');
        }
        
        if (currentStageIndex < prayer.length - 1) {
            currentStageIndex++;
        } else {
            // if end of stages has been reached, just stop auto play
            dispatch('stopAutoPlay');
            return;
        }
        
    };
</script>

<div 
    on:click={() => nextStage(true)} 
    on:keyup={() => nextStage(true)}
>
</div>

<style>

    div{
        /* background-color: blueviolet; */
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        z-index: 1;
    }

</style>