<script>

    import { createEventDispatcher } from 'svelte';

    export let isAutoPlaying;
    export let showConfirmModal;
    let animateExitCross = false;

    const dispatch = createEventDispatcher();

    const navigateHome = () => {
        if (isAutoPlaying) {
            dispatch('stopAutoPlay');
        }
        
        // animate exit cross bouncing
        animateExitCross = true;
        setTimeout(() => {
            animateExitCross = false;
        }, 300);
        
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