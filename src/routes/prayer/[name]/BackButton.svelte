<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let isAutoPlaying : boolean;
    export let currentStageIndex : number;

    const prevStage = (manual = false) => {
        // If a user manually triggered prevStage, stop auto play
        if (manual && isAutoPlaying) {
            dispatch('stopAutoPlay');
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
        /* background-color: aqua;
        opacity: 50%;
         */
        width:50%;
        height: 100%;
        position: absolute;
        z-index: 1;

    }

</style>