<script lang="ts">

    import { createEventDispatcher } from 'svelte';
    import audioStore from '../../../lib/stores/audio/audioStore';

    export let isAutoPlaying : boolean;
    export let showConfirmModal;
    let animateExitCross = false;

    /*
        Audio Store Variables
    */
    let isAudioActive : boolean;

    audioStore.subscribe(storeValues => {
        isAudioActive = storeValues.isAudioActive;
    });

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
        if (isAudioActive) {
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