<script lang="ts">
    import { goto } from '$app/navigation';

    export let prayer : string;

    const toPrayer = () => {
        goto(`/prayer/${prayer}`)
    };

</script>

<div
class="button"
on:click={toPrayer}
on:keyup={toPrayer}
>   
    Pray {prayer}
</div>

