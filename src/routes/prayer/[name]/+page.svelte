<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    
    import NoSleep from 'nosleep.js'
    
    import PrayerElementCounter from "./PrayerElementCounter.svelte"
    import ConfirmModal from './ConfirmModal.svelte';
    import BackButton from './BackButton.svelte';
    import ForwardButton from './ForwardButton.svelte';
    
    export let data;
    let prayer = data.prayer.prayer;

    
    let autoPlayIntervalId;
    let isAutoPlaying = false; // flag to store the autoplay state
    
    let currentStageIndex = 0;
    
    let animateExitCross                = false;
    let animatePlayButton               = false;
    let animatePauseButton              = false;
    let animatePlaybackSpeedButton      = false;
    
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
            
            // Clear the timer
            if (autoPlayIntervalId) {
                clearTimeout(autoPlayIntervalId);
            }
            
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

    const changePlaybackSpeed = () => {

        
        // animate play button bouncing
        animatePlaybackSpeedButton = true;
        autoPlayIntervalId = setTimeout(() => {
            animatePlaybackSpeedButton = false;
        }, 300);

        // increase index by 1
        playbackSpeedSelectedIndex++;

        // modulo this with total length of playbackSpeeds array
        playbackSpeedSelectedIndex = playbackSpeedSelectedIndex % playbackSpeeds.length;


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
    
    function navigateHome() {
        if (isAutoPlaying) {
            stopAutoPlay();
        }
        
        // animate exit cross bouncing
        animateExitCross = true;
        setTimeout(() => {
            animateExitCross = false;
        }, 300);
        
        showConfirmModal = true;
        
    }
    
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
    bind:autoPlayIntervalId={autoPlayIntervalId} 
    bind:currentStageIndex={currentStageIndex} 
    on:stopAutoPlay={stopAutoPlay}
    />
    
    <ForwardButton 
    {isAutoPlaying}
    {prayer}
    bind:autoPlayIntervalId={autoPlayIntervalId} 
    bind:currentStageIndex={currentStageIndex} 
    on:stopAutoPlay={stopAutoPlay}
    />
    
    <ConfirmModal show={showConfirmModal} {onConfirm} {onCancel} />
    
    <div class="container-fluid">
        <PrayerElementCounter {prayer} {currentStageIndex} />
        
        <div style="display:flex; justify-content:space-between; align-items:center;margin-bottom:15px; ">
            <span style="text-transform:capitalize;">
                {prayer[currentStageIndex].name}
            </span>
            
            <div
            style="z-index:2;"
            >
                <div class="btn"
                on:click={navigateHome} 
                on:keyup={navigateHome}
                >
                
                <img 
                class:zoom-in-out-box={animateExitCross}
                width="40"
                height="40"
                alt="exit"
                src="/icons/cross.svg">

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
            <div 
            class="btn"
            on:click={stopAutoPlay} 
            on:keyup={stopAutoPlay}
            >

            <img 
            class:zoom-in-out-box={animatePauseButton}
            width="50"
            height="50"
            alt="pause"
            src="/icons/pause.svg">

            </div>
        {:else}
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

        {/if}

        <div class="btn"
            on:click={changePlaybackSpeed}
            on:keyup={changePlaybackSpeed}
            class:zoom-in-out-box={animatePlaybackSpeedButton}
            style="position: relative; width: 60px;">
            <img style="position: absolute; width: 100%; height: 100%;" src="/icons/stopwatch.svg">
            <span style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 110%; font-weight:900;color:#1e272e; font-size:1rem;">
                {playbackSpeeds[playbackSpeedSelectedIndex].display}
            </span>
        </div>
    


    </div>

    </div>

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
        height: 42vmin; 
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

    .btn{
        background-color: white;
        border-radius: 2rem;
        width: 4rem;
        display: flex;
        justify-content: center;
        /* align-items:end; */
    }
    
    .btn:hover{
        cursor: pointer;
    }
    
    .zoom-in-out-box {
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
