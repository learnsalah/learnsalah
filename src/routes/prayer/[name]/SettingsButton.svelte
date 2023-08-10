
<script lang="ts">
    let animateSettingsButton = false;

    const openSettings = () => {

        // animate settings button bouncing
        animateSettingsButton = true;
        setTimeout(() => {
            animateSettingsButton = false;
        }, 300);
        
    };

</script>

<div class="btn" on:click={openSettings} on:keyup={openSettings}>

    <img 
    src="/icons/settings.svg" 
    class:zoom-in-out-box={animateSettingsButton}
    width="40"
    height="40"
    alt="settings">

</div>

