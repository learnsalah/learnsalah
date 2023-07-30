<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    
    import NoSleep from 'nosleep.js'
    
    import PrayerElementCounter from "./PrayerElementCounter.svelte"
    import ConfirmModal from './ConfirmModal.svelte';
    import BackButton from './BackButton.svelte';
    import ForwardButton from './ForwardButton.svelte';
	import ExitButton from './ExitButton.svelte';
	import PlayButton from './PlayButton.svelte';
	import PauseButton from './PauseButton.svelte';
	import PlaybackSpeedButton from './PlaybackSpeedButton.svelte';
    
    export let data;
    let prayer = data.prayer.prayer;
    
    let autoPlayIntervalId;
    let isAutoPlaying = false; // flag to store the autoplay state
    
    let currentStageIndex = 0;
    
    let animatePlayButton               = false;
    let animatePauseButton              = false;
    
    let noSleep;
    let noSleepEnabled = false;

    // let playbackSpeeds = [1, 1.5 , 0.5]
    let playbackSpeeds = [
        {
            display : "1",
            multiplier : 1
        },
        {
            display : "0.5",
            multiplier : 2
        },
        {
            display : "1.5",
            multiplier : 2/3
        }
    ]
    let playbackSpeedSelectedIndex = 0;
    
    
    const startAutoPlay = () => {
        // Always clear the interval
        if (autoPlayIntervalId) {
            clearTimeout(autoPlayIntervalId);
        }
        
        if (!isAutoPlaying) {
            // animate pause button bouncing
            animatePauseButton = true;
            setTimeout(() => {
                animatePauseButton = false;
            }, 300);
            
            // Set isAutoPlaying to true
            isAutoPlaying = true;
            
            // enable nosleep
            noSleep.enable();
            noSleepEnabled = true;
        }
        
        if (isAutoPlaying) {
            autoPlayIntervalId = setTimeout(() => {
                
                if (currentStageIndex < prayer.length - 1) {
                    currentStageIndex++;
                } else {
                    // if end of stages has been reached, just stop auto play
                    stopAutoPlay();
                    return;
                }
                
                // Re-trigger the function after the current stage's duration
                startAutoPlay();
                
            }, playbackSpeeds[playbackSpeedSelectedIndex].multiplier * prayer[currentStageIndex].duration);
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
            
        }
        
        
    };

    
    onMount(() => {


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
    
    let showConfirmModal = false;
    
    function onConfirm() {
        showConfirmModal = false;
        goto('/');
    }
    
    function onCancel() {
        showConfirmModal = false;
    }
</script>

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
    
    <ConfirmModal show={showConfirmModal} {onConfirm} {onCancel} />
    
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


<div class="instruction_container">
    <div class="imageContainer">
        <img src="{prayer[currentStageIndex].img}" alt="prayer pose" class="responsiveImage">
    </div>
    
    <div class="prayerInstruction">
        {prayer[currentStageIndex].instruction}
    </div>


    <div class="prayerArabicText">
        {prayer[currentStageIndex].text_arabic}
    </div>

    <div class="prayerTransliterationText">
        {#if prayer[currentStageIndex].count > 1}
            <span style="color:#218c74;">
                {prayer[currentStageIndex].count}&times;
            </span>
        {/if}
        {prayer[currentStageIndex].text_transliteration}
    </div>
    
    <div class="prayerEnglishText">
        {prayer[currentStageIndex].text_eng}
    </div>
</div>



    <div style="position: fixed; z-index: 2; display:flex; justify-content:flex-start; bottom: 25px; ">
        

        {#if isAutoPlaying}

            <PauseButton
            {isAutoPlaying}
            bind:animatePauseButton={animatePauseButton}
            on:stopAutoPlay={stopAutoPlay}
            />

        {:else}
        
            <PlayButton
            {isAutoPlaying}
            bind:animatePlayButton={animatePlayButton}
            on:startAutoPlay={startAutoPlay}
            />

        {/if}

        <PlaybackSpeedButton
        bind:autoPlayIntervalId={autoPlayIntervalId}
        bind:playbackSpeedSelectedIndex={playbackSpeedSelectedIndex}
        {playbackSpeeds}
        />
    


    </div>


<style>
    
    .instruction_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2em;
        box-sizing: border-box;
    }

    .imageContainer {
        width: 100%;
        height: 40vmin; 
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
    }

    .responsiveImage {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .prayerInstruction{
        font-size: 4vmin;
        color: #218c74;
        font-style: oblique;
        font-weight: 900;
        margin-bottom: 20px;
    }

    .prayerArabicText {
        font-size: 5vmin; 
        font-family:'Times New Roman', Times, serif;
    }

    .prayerTransliterationText {
        font-size: 10vmin; 
        font-weight: 500;
    }

    .prayerEnglishText {
        font-size: 5vmin; 
    }

    :global(.btn){
        background-color: white;
        border-radius: 2rem;
        padding: 0 0.6rem 0 0.6rem;
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
