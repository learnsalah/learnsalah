<script lang="ts">
    export let prayer_name : string;
    export let isCoverPageActive : boolean;
</script>

<div
    on:click={() => isCoverPageActive = false} 
    on:keyup={() => isCoverPageActive = false}
    class="button"
>   
    Pray {prayer_name}
</div>

