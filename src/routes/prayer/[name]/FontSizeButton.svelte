
<script lang="ts">

    import { fontSizeTransliterationText } from '../../../store.js';

    let animateFontSizeButton : Boolean;

    const changeFontSize = () => {

        // animate button
        animateFontSizeButton = true;
        setTimeout(() => {
            animateFontSizeButton = false;
        }, 300);

        // Update the font size
        // Increase the font size by 1
        fontSizeTransliterationText.update(size => {
            let newSize = size + 1;

            // if newSize is greater than 21, reset to 6
            if (newSize > 21) {
                return 6;
            }

            // if newSize is less than 6, reset to 21
            if (newSize < 6) {
                return 21;
            }

            return newSize;
        });
    };

</script>

<div 
class="btn"
on:click={changeFontSize}
on:keyup={changeFontSize}
>

    <img
    class:zoom-in-out-box={animateFontSizeButton}
    alt="font size"
    src="/icons/font-size.svg"/>


</div>

<style>
    img {
        width: 45px;
        height: 45px;
    }
</style>
