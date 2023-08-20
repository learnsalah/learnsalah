<script lang="ts">

    import { goto } from '$app/navigation';
    import audioStore from '../../../lib/stores/audio/audioStore';
    import { fontSize } from '../../../lib/stores/font/fontStore';



    /*
        Audio Store Variables
    */
    let playbackSpeed: number;

    audioStore.subscribe(storeValues => {
        playbackSpeed = storeValues.playbackSpeed;
    });

    const onConfirm = () => {
        
        // reset playback speed
        audioStore.update(storeValues => ({
            ...storeValues,
            playbackSpeed: 1
        }));

        // reset font size
        fontSize.update(_size => {
            return 10;
        });

        goto('/');
    }

</script>


<hgroup>
    <h2>
        End Prayer?
    </h2>
    <h5>Any progress on this prayer will be lost.</h5>
</hgroup>

<a
class="button" style="width:100%;"
on:click={onConfirm}
on:keyup={onConfirm}
>
    End Prayer
</a>




