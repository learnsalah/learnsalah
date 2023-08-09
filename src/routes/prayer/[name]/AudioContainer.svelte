 <script lang="ts">
    import { afterUpdate } from 'svelte';
    import { audioRefStore } from '../../../store.js'; 

    export let prayer;
    export let currentStageIndex: number;
    export let hasActiveAudio: boolean;
    export let playbackSpeed : number;
    let audioRef;

    afterUpdate (() => {
        if (hasActiveAudio && audioRef) {

            // set playback speed
            audioRef.playbackRate = playbackSpeed;

            // Play the audio - nasty hack because it throws an error 
            audioRef.play().catch(_error => {});;

            // update the store
            audioRefStore.set(audioRef);
        }
    });

  
</script>


{#if hasActiveAudio}

    <audio bind:this={audioRef} src="{prayer[currentStageIndex]?.audio_1.path}" title="audio"  >
    </audio>

{/if}
