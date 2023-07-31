<script>

    import { fontSizeTransliterationText } from '../../../store.js';

    export let prayer;
    export let currentStageIndex;

    let images = [
        "ruku", "sitting_left", "sitting_right", "sitting",
        "sitting2", "standing", "standing2", "standing3",
        "sujood"
    ];
    $: preloadImageUrls = images.map((image) => `/images/${image}.jpg`);

    
</script>


<svelte:head>
    {#each preloadImageUrls as image}
      <link rel="preload" as="image" href={image} />
    {/each}
</svelte:head>


<div class="instruction_container">
    <div class="imageContainer">
        <img src="{prayer[currentStageIndex].img}" alt="prayer pose" class="responsiveImage">
    </div>
    
    <div class="prayerInstruction">
        {prayer[currentStageIndex].instruction}
    </div>


    <div class="prayerArabicText">
        {prayer[currentStageIndex].text_arabic}
    </div>

    <div class="prayerTransliterationText"
    style="font-size: {$fontSizeTransliterationText}vmin;"
    >
        {#if prayer[currentStageIndex].count > 1}
            <span style="color:#218c74;">
                {prayer[currentStageIndex].count}&times;
            </span>
        {/if}
         
        {prayer[currentStageIndex].text_transliteration}
        
    </div>
    
    <div class="prayerEnglishText">
        {prayer[currentStageIndex].text_eng}
    </div>
</div>

<style>
    .instruction_container {
        /* background-color: aqua; */
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
    }

    .imageContainer {
        /* background-color: blue; */
        width: 100%;
        height: 45vmin; 
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
    }

    .responsiveImage {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .prayerInstruction{
        /* background-color: red; */
        font-size: 4vmin;
        color: #218c74;
        font-style: oblique;
        font-weight: 900;
        margin-bottom: 5px;
    }

    .prayerArabicText {
        /* background-color:dodgerblue; */
        font-size: 5vmin; 
        font-family:'Times New Roman', Times, serif;
    }

    .prayerTransliterationText {
        /* background-color: magenta; */
        font-weight: 500;
    }

    .prayerEnglishText {
        /* background-color: darksalmon; */
        font-size: 5vmin; 
    }
</style>