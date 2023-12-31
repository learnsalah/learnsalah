<script>
    import { onMount, onDestroy } from 'svelte';
    
    import NoSleep from 'nosleep.js'

    import { audioRefStore } from '../../../store.js'; 
    
    import PrayerElementCounter from "./PrayerElementCounter.svelte"
    import ConfirmModal from './ConfirmModal.svelte';
    import BackButton from './BackButton.svelte';
    import ForwardButton from './ForwardButton.svelte';
	import ExitButton from './ExitButton.svelte';
	import PlaybackSpeedButton from './PlaybackSpeedButton.svelte';
	import InstructionContainer from './InstructionContainer.svelte';
	import FontSizeButton from './FontSizeButton.svelte';
	import CoverPage from './CoverPage.svelte';
	import AudioToggleButton from './AudioToggleButton.svelte';
	import AutoPlayToggleButton from './AutoPlayToggleButton.svelte';
	import AudioContainer from './AudioContainer.svelte';
    
    export let data;
    let prayer_name = data.prayer.name;
    let prayer = data.prayer.prayer;
    
    let autoPlayIntervalId;

    // flag to store the autoplay state
    let isAutoPlaying = false; 
    
    let currentStageIndex = 0;
    
    let animatePlayButton               = false;
    let animatePauseButton              = false;
    
    let noSleep;
    let noSleepEnabled = false;

    let isCoverPageActive = true;

    let hasActiveAudio = false;

    let playbackSpeeds = [1, 0.7, 1.5];
    let playbackSpeedSelectedIndex = 0;

    let showConfirmModal = false;

    let audioRef;

    audioRefStore.subscribe(value => {
        audioRef = value;
    });

    
    let icons = ["play", "pause", "cross", "font-size", "stopwatch", "speaker_off", "speaker_on", "settings"]
    $: preloadIconUrls = icons.map((icon) => `/icons/${icon}.svg`);

    let images = [
        "ruku", "sitting_left", "sitting_right", "sitting",
        "sitting2", "standing", "standing2", "standing3",
        "sujood"
    ];
    $: preloadImageUrls = images.map((image) => `/images/${image}.jpg`);

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
        let playbackDuration = prayer[currentStageIndex].audio_1.duration;
        let playbackSpeedMultiplier = 1 / playbackSpeeds[playbackSpeedSelectedIndex];
        // Set timeout for this stage
        autoPlayIntervalId = setTimeout(proceedToNextStage, playbackSpeedMultiplier * playbackDuration);

    };

    const triggerAudioSyncPlayback = () => {

        // Attach the listener for when the audio ends
        audioRef.addEventListener('ended', handleAudioEnded);

        // Play the audio - nasty hack because it throws an error 
        audioRef.play().catch(_error => {});;

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
            noSleepEnabled = true;
        }

        // Play current audio track when play button is hit
        if (hasActiveAudio && audioRef) {

            triggerAudioSyncPlayback()

        } else {

            triggerStaticTimeFramePlayback()

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
            noSleepEnabled = false;
            
            // animate play button bouncing
            animatePlayButton = true;
            autoPlayIntervalId = setTimeout(() => {
                animatePlayButton = false;
            }, 300);

            // pause current audio track when pause button is hit
            if (hasActiveAudio && audioRef) {

                // pause audio
                audioRef.pause();

                // remove event listener from audio
                audioRef.removeEventListener('ended', handleAudioEnded);
            }
            
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
            
            <ConfirmModal 
            bind:showConfirmModal={showConfirmModal} />
            
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
                    />
                </div>

            </div>
        </div>


        <InstructionContainer
        {prayer}
        {currentStageIndex}
        />

        <AudioContainer 
        {prayer}
        {currentStageIndex}
        playbackSpeed={playbackSpeeds[playbackSpeedSelectedIndex]}
        bind:hasActiveAudio={hasActiveAudio}
        />


        <div style="position: fixed; z-index: 2; display:flex; justify-content:flex-start; align-items:end; bottom: 3vh; width: 90vw; margin:0 auto; left:0;right:0; border-radius: 100px;  background-color:transparent; ">
            
            <AutoPlayToggleButton
            {isAutoPlaying}
            bind:animatePlayButton={animatePlayButton}
            bind:animatePauseButton={animatePauseButton}
            on:startAutoPlay={startAutoPlay}
            on:stopAutoPlay={stopAutoPlay}
            />

            <AudioToggleButton
            {isAutoPlaying}
            bind:hasActiveAudio={hasActiveAudio}
            on:triggerStaticTimeFramePlayback={triggerStaticTimeFramePlayback}
            on:startAutoPlay={startAutoPlay}
            />

            <PlaybackSpeedButton
            bind:autoPlayIntervalId={autoPlayIntervalId}
            bind:playbackSpeedSelectedIndex={playbackSpeedSelectedIndex}
            {playbackSpeeds}
            />

            <FontSizeButton />

            <!-- <img src="/icons/settings.svg" width="50"> -->

        </div>
    </div>

{/if}

<style>

    :global(.btn){
        background-color: white;
        border-radius: 2rem;
        padding: 0 0.3rem 0 0.3rem;
        display: flex;
        justify-content: center;
    }
    
    :global(.btn:hover){
        cursor: pointer;
    }
    
    :global(.zoom-in-out-box) {
        animation: zoom-in-zoom-out 0.3s ease;
    }

    @keyframes zoom-in-zoom-out {
            0% {
                transform: scale(1, 1);
            }
            33% {
                transform: scale(1.2, 1.2);
            }
            66% {
                transform: scale(0.8, 0.8);
            }
            100% {
                transform: scale(1, 1);
            }
    }
</style>
