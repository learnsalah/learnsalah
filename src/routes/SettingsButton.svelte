
<script lang="ts">

    export let showSettingsModal : boolean = false;
    let animateSettingsButton : boolean = false;

    const openSettings = () => {

        // animate settings button bouncing
        animateSettingsButton = true;
        setTimeout(() => {
            animateSettingsButton = false;
        }, 300);

        showSettingsModal = true;
        
    };

</script>


<a 
on:click={openSettings}
on:keyup={openSettings}
>
    <img 
    src="/icons/settings.svg" 
    width="19"
    height="19"
    alt="settings">

    Change Settings

</a>

<style>
    img {
        margin-right: 5px;
    }

    a {
        display: flex;
        align-items: center;
        width: fit-content;
        border-radius: 5px;
        padding: 5px 5px 5px 0;
        margin-top: 10px;

    }
</style>