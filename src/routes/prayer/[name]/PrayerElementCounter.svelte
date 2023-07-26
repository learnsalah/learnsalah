<script>
  export let prayer = null;
  export let currentStageIndex = 0;

  let stageWidth = 3;

</script>

<div class="counter">
  {#each prayer as stage, i}
    <div class="progress_bar" 
         style="background:{currentStageIndex >= i ? '#218c74' : '#d1d1d1'};width:{stageWidth}vw" 
    ></div>
  {/each}
</div>

<style>
  .counter {
    position: relative;
    display: inline-flex;
    align-items: center; 
    justify-content: flex-start; 
    flex-wrap: wrap; /* Allow elements to wrap to next line */
    width: 100%;
    margin-bottom:10px;
  }

  .progress_bar {
    height: 4px;
    margin-right: 2px;
    margin-bottom: 4px; /* Add some margin between rows */
    border-radius: 3px;
  }
</style>
