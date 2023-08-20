<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { afterUpdate } from 'svelte';
    import audioStore from '../../../lib/stores/audio/audioStore';
    import { get } from 'svelte/store';


    /*
        Component Prop variables
    */
    export let prayer;
    export let currentStageIndex: number;
    export let isAutoPlaying: Boolean;

    /*
        Component variables
    */
    let animateAudioToggleButton: boolean = false;
    let audioRef;


    /*
        Audio Store Variables
    */
    let isAudioActive: boolean;
    let playbackSpeed: number;

    audioStore.subscribe(storeValues => {
        isAudioActive = storeValues.isAudioActive;
        playbackSpeed = storeValues.playbackSpeed;
    });

    const storeValues = get(audioStore);
    const speaker = storeValues.speaker;
    
    $: audioPath = prayer[currentStageIndex]?.[speaker]?.path;

    /*
        Dispatch Method
    */
    const dispatch = createEventDispatcher();

    afterUpdate(() => {
        if (isAudioActive && audioRef) {

            // Set playback speed
            audioRef.playbackRate = playbackSpeed;

            // Play the audio
            audioRef.play().catch(_error => {});
            
            // Update the audioRef in the store
            audioStore.update(storeValues => ({
                ...storeValues,
                audioRef: audioRef
            }));
        }
    });

    const toggleAudio = () => {

        animateAudioToggleButton = true;
        setTimeout(() => {
            animateAudioToggleButton = false;
        }, 300);

        // Toggle the isAudioActive in the store
        audioStore.update((storeValues) => {
            // invert isAudioActive
            return { ...storeValues, isAudioActive: !storeValues.isAudioActive };
        });

        console.log(isAudioActive);

        // If auto play AND audio is activated, 
        // Then we wish to keep the auto play active
        // By static time frame playback (not audio sync playback)
        // So we call the appropriate method
        if (isAutoPlaying && !isAudioActive) {
            dispatch("triggerStaticTimeFramePlayback")
        }

        // if (isAutoPlaying && isAudioActive) {
        //     // dispatch("startAutoPlay")
        // }
    };
</script>

{#if isAudioActive}
    <audio bind:this={audioRef} src="{audioPath}" title="audio"></audio>
{/if}

<div 
class="btn"
on:click={toggleAudio}
on:keyup={toggleAudio}
>
    {#if isAudioActive}
        <img
        class:zoom-in-out-box={animateAudioToggleButton}
        alt="audio on/off"
        src="/icons/speaker_off.svg"
        width="40px"
        height="40px"
        />
    {:else}
        <img
        class:zoom-in-out-box={animateAudioToggleButton}
        alt="audio on/off"
        src="/icons/speaker_on.svg"
        width="40px"
        height="40px"
        />
    {/if}
</div>

