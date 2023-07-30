<script>

    export let autoPlayIntervalId;
    export let playbackSpeedSelectedIndex;
    export let playbackSpeeds;
    let animatePlaybackSpeedButton;

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

</script>

<div class="btn"
    on:click={changePlaybackSpeed}
    on:keyup={changePlaybackSpeed}
    class:zoom-in-out-box={animatePlaybackSpeedButton}
    style="width: 50px;">

    <img
    alt="stopwatch" 
    src="/icons/stopwatch.svg"
    >
    <span class="playbackSpeedNumber">
        {playbackSpeeds[playbackSpeedSelectedIndex].display}
    </span>

</div>

<style>
    img {
        position: absolute; 
        width: 50px; 
        height: 50px;
    }
    .playbackSpeedNumber {
        position: absolute; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        height: 110%; 
        font-weight:900;
        color:#1e272e;
        font-size:1rem;
    }
</style>