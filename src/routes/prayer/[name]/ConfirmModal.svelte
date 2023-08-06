<script>

    import { goto } from '$app/navigation';

    export let showConfirmModal = false;

    function onConfirm() {
        showConfirmModal = false;
        goto('/');
    }
    
    function onCancel() {
        showConfirmModal = false;
    }
</script>

{#if showConfirmModal}
    <div class="modal" on:click={onCancel} on:keyup={onCancel}>
        <div class="modal-content" on:click|stopPropagation on:keyup|stopPropagation>
            <hgroup>
                <h2>
                    End Prayer?
                </h2>
                <h5>Any progress on this prayer will be lost.</h5>
            </hgroup>
            
            <a href="#" 
            class="button" style="width:100%;"
            on:click={onConfirm}
            on:keyup={onConfirm}
            >
                End Prayer
            </a>
            
            <div
            class="cancel-link-wrapper"
            on:click={onCancel}
            on:keyup={onCancel}
            >
                <a href="#">
                    Continue
                </a>
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
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
}

.cancel-link-wrapper {
    width: fit-content;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
</style>
