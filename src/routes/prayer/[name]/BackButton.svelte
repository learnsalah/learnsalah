<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let isAutoPlaying : boolean;
    export let autoPlayIntervalId;
    export let currentStageIndex : number;

    const prevStage = (manual = false) => {
        // If a user manually triggered prevStage, stop auto play
        if (manual && isAutoPlaying) {
            dispatch('stopAutoPlay');
        }
        
        // clear auto play
        if (autoPlayIntervalId) {
            clearTimeout(autoPlayIntervalId);
        }
        
        if (currentStageIndex > 0) {
            currentStageIndex--;
        }
    };
</script>

<div 
    on:click={() => prevStage(true)} 
    on:keyup={() => prevStage(true)}
>
</div>

<style>

    div{
        width:50%;
        height: 100%;
        position: absolute;
        z-index: 1;

    }

</style>