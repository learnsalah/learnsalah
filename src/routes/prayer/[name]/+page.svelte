<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    import NoSleep from 'nosleep.js'

    import audioStore from '$lib/stores/audio/audioStore';
    import settingsStore from '$lib/stores/settings/settingsStore';
    
    import PrayerElementCounter from "./PrayerElementCounter.svelte"
    import ExitModal from './ExitModal.svelte';
    import Modal from '../../Modal.svelte';
    import BackButton from './BackButton.svelte';
    import ForwardButton from './ForwardButton.svelte';
	import ExitButton from './ExitButton.svelte';
	import PlaybackSpeedButton from './PlaybackSpeedButton.svelte';
	import InstructionContainer from './InstructionContainer.svelte';
	import FontSizeButton from './FontSizeButton.svelte';
	import CoverPage from './CoverPage.svelte';
	import AudioToggleButton from './AudioToggleButton.svelte';
	import AutoPlayToggleButton from './AutoPlayToggleButton.svelte';
    


    /*
        Prayer Settings Store Variables
    */
    // Extract the values
    const sunnahRituals = $settingsStore.sunnahRituals;
    const sunnahPrayers = $settingsStore.sunnahPrayers;
    const maleFemaleImage = $settingsStore.maleFemaleImage;

    /*
        Audio Store Variables
    */
    let audioRef;
    let isAudioActive : boolean;
    let playbackSpeed : number;

    audioStore.subscribe(storeValues => {
        audioRef = storeValues.audioRef;
        isAudioActive = storeValues.isAudioActive;
        playbackSpeed = storeValues.playbackSpeed;
    });

    const speaker = $audioStore.speaker;
    $: audioDuration = prayer[currentStageIndex]?.[speaker]?.duration;

    /*
        Preloading Icons + Images
    */
    let icons = ["play", "pause", "cross", "font-size", "stopwatch", "speaker_off", "speaker_on"]
    $: preloadIconUrls = icons.map((icon) => `/icons/${icon}.svg`);

    let images = [
        "ruku", "sitting_left", "sitting_right", "sitting",
        "sitting2", "standing", "standing2", "standing3",
        "sujood"
    ];
    $: preloadImageUrls = images.map((image) => `/images/${image}.jpg`);


    /*
        Declaring prayer meta data (from URL parameter)
    */

    export let data;
    // holding prayer steps according to preferences
    let prayer = null;
    // get prayer name
    let prayer_name = data.prayer.name;
    // get prayer steps according to preferences
    if (sunnahRituals === 'true') {
        prayer = data.prayer.prayer.sunnah_rituals;

    }else {
        prayer = data.prayer.prayer.bare;
    }
 
    
    let autoPlayIntervalId;

    // flag to store the autoplay state
    let isAutoPlaying = false; 
    
    let currentStageIndex = 0;
    
    let animatePlayButton  = false;
    let animatePauseButton = false;
    
    let noSleep;

    let isCoverPageActive = true;
    let showConfirmModal = false;


    const proceedToNextStage = () => {
        if (currentStageIndex < prayer.length - 1) {
            currentStageIndex++;
        } else {
            // If end of stages has been reached, just stop auto play
            stopAutoPlay();
            return;
        }
        // Re-trigger the function
        startAutoPlay();
    };

    // Function to handle the end of the audio
    const handleAudioEnded = () => {

        audioRef.removeEventListener('ended', handleAudioEnded); 
        proceedToNextStage();
    };

    const triggerStaticTimeFramePlayback = () => {

        // If no audio, revert to static time frame
        let playbackDuration = audioDuration;
        let playbackSpeedMultiplier = 1 / playbackSpeed;
        // Set timeout for this stage
        autoPlayIntervalId = setTimeout(proceedToNextStage, playbackSpeedMultiplier * playbackDuration);

    };


    const startAutoPlay = () => {

        // Always clear the interval
        if (autoPlayIntervalId) {
            clearTimeout(autoPlayIntervalId);
        }

        if (!isAutoPlaying) {
            // Animate pause button bouncing
            animatePauseButton = true;
            setTimeout(() => {
                animatePauseButton = false;
            }, 300);

            // Set isAutoPlaying to true
            isAutoPlaying = true;

            // Enable nosleep
            noSleep.enable();
        }

        // Play current audio track when play button is hit
        if (isAudioActive && audioRef) {

            // Attach the listener for when the audio ends
            audioRef.addEventListener('ended', handleAudioEnded);

        } else {

            triggerStaticTimeFramePlayback()

        }
    };

    const stopAudio = () => {

        // pause current audio track
        if (isAudioActive && audioRef) {

            // pause audio
            audioRef.pause();

            // remove event listener from audio
            audioRef.removeEventListener('ended', handleAudioEnded);

            // update store value
            audioStore.update(storeValues => ({
                ...storeValues,
                isAudioActive: false
            }));
        }
    };
    
    const stopAutoPlay = () => {

        // Always clear the interval
        if (autoPlayIntervalId) {
            clearTimeout(autoPlayIntervalId);
        }

        if (isAutoPlaying){
            
            // Set isAutoPlaying to false
            isAutoPlaying = false;
            
            // disable nosleep
            noSleep.disable();
            
            // animate play button bouncing
            animatePlayButton = true;
            autoPlayIntervalId = setTimeout(() => {
                animatePlayButton = false;
            }, 300);

            stopAudio()
            
        }

    };

    
    onMount(() => {

        // handling for when tab is changed or browser is closed
        const handleVisibilityChange = () => {

            // if document (e.g. tab) becomes hidden
            if (document.hidden) {

                // stop autoplay when tab is changed
                stopAutoPlay();

                // disable noSleep when tab is changed
                noSleep.disable(); 

            } 
        }

        // enable visibilitychange listener to detect if the browser tab was 
        // switched or if the browser was closed. in those cases we need to e.g.
        // stop the auto play 
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // instance of noSleep
        noSleep = new NoSleep();
        
        return () => {

            // disable visibilitychange listener on component unmount
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            // disable noSleep on component unmount
            noSleep.disable(); 
        };

    });
    
    onDestroy(() => {

        // Ensure auto-play stops when the component is destroyed
        if (isAutoPlaying) {
            stopAutoPlay();
        }
        
        return () => {
            noSleep.disable(); // Cleanup on component unmount
        };
        
    });
    


    
</script>

<svelte:head>
    {#each preloadIconUrls as image}
        <link 
        rel="preload" 
        as="image"
        type="image/svg+xml"
        href={image} />
    {/each}
    {#each preloadImageUrls as image}
        <link 
        rel="preload" 
        as="image"
        type="image/jpg"
        href={image} />
    {/each}  
</svelte:head>

<CoverPage 
{prayer_name}
bind:isCoverPageActive={isCoverPageActive}
/>

{#if !isCoverPageActive}

    <div>
        <div>

            <BackButton 
            {isAutoPlaying} 
            bind:currentStageIndex={currentStageIndex} 
            on:stopAutoPlay={stopAutoPlay}
            />
            
            <ForwardButton 
            {isAutoPlaying}
            {prayer}
            bind:currentStageIndex={currentStageIndex} 
            on:stopAutoPlay={stopAutoPlay}
            />
            
            <Modal bind:showModal={showConfirmModal}>
                <ExitModal/>
            </Modal>
            
            
            <div class="container-fluid">
                <PrayerElementCounter {prayer} {currentStageIndex} />
                
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="text-transform:capitalize;">
                        {prayer[currentStageIndex].name}
                    </span>

                    <ExitButton 
                    {isAutoPlaying}
                    bind:showConfirmModal={showConfirmModal}
                    on:stopAutoPlay={stopAutoPlay}
                    on:stopAudio={stopAudio}
                    />
                </div>

            </div>
        </div>


        <InstructionContainer
        {prayer}
        {currentStageIndex}
        />


        <div class="button-bar">
            
            <AutoPlayToggleButton
            {isAutoPlaying}
            bind:animatePlayButton={animatePlayButton}
            bind:animatePauseButton={animatePauseButton}
            on:startAutoPlay={startAutoPlay}
            on:stopAutoPlay={stopAutoPlay}
            />

            <AudioToggleButton
            {isAutoPlaying}
            {prayer}
            {currentStageIndex}
            on:triggerStaticTimeFramePlayback={triggerStaticTimeFramePlayback}
            />

            <PlaybackSpeedButton/>

            <FontSizeButton />

        </div>
    </div>

{/if}

<style>
    .button-bar {
        position: fixed; 
        z-index: 2; 
        display:flex; 
        justify-content:flex-start; 
        align-items:end; 
        bottom: 3vh; 
        width: 90vw; 
        margin:0 auto; 
        left:0;
        right:0; 
        border-radius: 100px;  
        background-color:transparent;
    }

    :global(.button-bar .btn) {
        margin-right: 10px;
    }
</style>
