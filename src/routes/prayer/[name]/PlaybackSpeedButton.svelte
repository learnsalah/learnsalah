<script lang="ts">
    import audioStore from '../../../lib/stores/audio/audioStore';
    
    let animatePlaybackSpeedButton : boolean = false;
    
    let playbackSpeeds = [1, 0.7, 1.5];
    let playbackSpeedSelectedIndex = 0;

    const changePlaybackSpeed = () => {
        
        // animate play button bouncing
        animatePlaybackSpeedButton = true;
        setTimeout(() => {
            animatePlaybackSpeedButton = false;
        }, 300);
        
        // increase index by 1
        playbackSpeedSelectedIndex++;
        
        // modulo this with total length of playbackSpeeds array
        playbackSpeedSelectedIndex = playbackSpeedSelectedIndex % playbackSpeeds.length;
        
        // Update the playbackspeed in the store
        audioStore.update(storeValues => ({
            ...storeValues,
            playbackSpeed: playbackSpeeds[playbackSpeedSelectedIndex]
        }));

    };
    
</script>

<div class="btn"
on:click={changePlaybackSpeed}
on:keyup={changePlaybackSpeed}
class:zoom-in-out-box={animatePlaybackSpeedButton}
style="width: 40px; position:relative;">

    <img
    alt="stopwatch" 
    src="/icons/stopwatch.svg"
    width="40px"
    height="40px"
    >
    <span class="playbackSpeedNumber">
        {playbackSpeeds[playbackSpeedSelectedIndex]}
    </span>

</div>

<style>
    .playbackSpeedNumber {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        
        position: absolute;
        top: 55%;
        left: 51%;
        transform: translate(-55%, -50%);
        
        font-weight: 900;
        color: #1e272e;
        font-size: 0.75rem;
    }
</style>