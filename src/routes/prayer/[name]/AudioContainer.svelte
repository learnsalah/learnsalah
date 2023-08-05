 <script lang="ts">
    import { afterUpdate } from 'svelte';

    // import { createEventDispatcher } from 'svelte';
    // const dispatch = createEventDispatcher();

    export let prayer;
    export let currentStageIndex: number;
    export let hasActiveAudio: boolean;
    export let playbackSpeed : number;
    let audioRef;

    afterUpdate (() => {
        if (hasActiveAudio && audioRef) {

            // set playback speed
            audioRef.playbackRate = playbackSpeed;

            // play audio
            audioRef.play();
        }
    });

  
</script>


{#if hasActiveAudio}

    <audio bind:this={audioRef} src="{prayer[currentStageIndex]?.audio_1.path}" title="audio"  >
    </audio>

{/if}
