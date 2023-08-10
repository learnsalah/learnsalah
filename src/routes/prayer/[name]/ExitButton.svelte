<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    export let isAutoPlaying : boolean;
    export let hasActiveAudio : boolean;
    export let showConfirmModal;
    let animateExitCross = false;

    const dispatch = createEventDispatcher();

    const navigateHome = () => {

        // animate exit cross bouncing
        animateExitCross = true;
        setTimeout(() => {
            animateExitCross = false;
        }, 300);
        
        // if auto play is active, stop it
        if (isAutoPlaying) {
            dispatch('stopAutoPlay');
        }

        // if audio is active, stop it
        if (hasActiveAudio) {
            dispatch('stopAudio');
        }

        showConfirmModal = true;
        
    }
</script>


    
<div
style="z-index:2;">

    <div class="btn exit_btn"
    on:click={navigateHome} 
    on:keyup={navigateHome}>
    
        <img 
        class:zoom-in-out-box={animateExitCross}
        width="40"
        height="40"
        alt="exit"
        src="/icons/cross.svg">
    </div>
</div>

<style>
    .exit_btn {
        padding-right: 0;
    }
</style>