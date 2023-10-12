<script lang="ts">
    export let showModal: boolean = false;
    let animateExitCross = false;

    $: if (showModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const onCancel = (animate = true) => {
        if (animate) {
            animateExitCross = true;
            setTimeout(() => {
                animateExitCross = false;
                showModal = false;
            }, 150);
        } else {
            showModal = false;
        }
    };

</script>

{#if showModal}
    <div class="modal" on:click={() => onCancel(false)} on:keyup={() => onCancel(true)}>
        <div class="modal-wrapper" on:click|stopPropagation on:keyup|stopPropagation>
            <div class="modal-header">
                <div class="left-buttons">
                    <slot name="back-link"></slot>
                </div>
                <div class="right-buttons">
                    <img class="modal-btn exit-btn" class:zoom-in-out-box={animateExitCross} width="30" height="30" alt="exit" src="/icons/cross.svg" on:click={() => onCancel(true)} on:keyup={() => onCancel(true)}>
                </div>
            </div>
            <div class="modal-content">
                <slot/>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden; /* Prevent background scrolling */
    }

    .modal-wrapper {
        background-color: #fff;
        padding: 20px 20px 20px 20px;
        border-radius: 10px;
        width: 90vw;
        max-width: 600px;
    }

    .modal-content {
        max-height: 50vh;
        overflow-y: auto;
        padding-right: 15px;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
    }

    .left-buttons,
    .right-buttons {
        display: flex;
        align-items: center;
    }

    .modal-btn {
        display: flex;
        align-items: center;
        height: 30px;
    }

    .exit-btn {
        width: 30px;
    }

    .exit-btn:hover {
        cursor: pointer;
    }

</style>