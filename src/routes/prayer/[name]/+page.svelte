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
                
                <svg
                class:zoom-in-out-box={animateExitCross}
                width="40" height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" 
                fill="#1e272e"/>
            </svg>
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
                <svg 
                class:zoom-in-out-box={animatePauseButton}
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.07612 8.61732C8 8.80109 8 9.03406 8 9.5V14.5C8 14.9659 8 15.1989 8.07612 15.3827C8.17761 15.6277 8.37229 15.8224 8.61732 15.9239C8.80109 16 9.03406 16 9.5 16C9.96594 16 10.1989 16 10.3827 15.9239C10.6277 15.8224 10.8224 15.6277 10.9239 15.3827C11 15.1989 11 14.9659 11 14.5V9.5C11 9.03406 11 8.80109 10.9239 8.61732C10.8224 8.37229 10.6277 8.17761 10.3827 8.07612C10.1989 8 9.96594 8 9.5 8C9.03406 8 8.80109 8 8.61732 8.07612C8.37229 8.17761 8.17761 8.37229 8.07612 8.61732ZM13.0761 8.61732C13 8.80109 13 9.03406 13 9.5V14.5C13 14.9659 13 15.1989 13.0761 15.3827C13.1776 15.6277 13.3723 15.8224 13.6173 15.9239C13.8011 16 14.0341 16 14.5 16C14.9659 16 15.1989 16 15.3827 15.9239C15.6277 15.8224 15.8224 15.6277 15.9239 15.3827C16 15.1989 16 14.9659 16 14.5V9.5C16 9.03406 16 8.80109 15.9239 8.61732C15.8224 8.37229 15.6277 8.17761 15.3827 8.07612C15.1989 8 14.9659 8 14.5 8C14.0341 8 13.8011 8 13.6173 8.07612C13.3723 8.17761 13.1776 8.37229 13.0761 8.61732Z" 
                fill="#1e272e"/>
                </svg>
            </div>
        {:else}
            <div 
            class="btn"
            on:click={startAutoPlay}
            on:keyup={startAutoPlay}
            >
                <svg 
                class:zoom-in-out-box={animatePlayButton}
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z" 
                fill="#1e272e"/>
                </svg>

            </div>

        {/if}

        <div class="btn"
            on:click={changePlaybackSpeed}
            on:keyup={changePlaybackSpeed}
            class:zoom-in-out-box={animatePlaybackSpeedButton}
            style="position: relative; width: 60px;">
            <img style="position: absolute; width: 100%; height: 100%;" src="/icons/stopwatch.svg">
            <span style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 110%; font-weight:900;color:#1e272e; font-size:1.23rem;">
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
