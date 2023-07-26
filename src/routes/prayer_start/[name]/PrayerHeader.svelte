<script lang="ts">
    import {prayers} from "./prayer_intro";

    export let prayer_type;

    let prayer;

    if (!prayers) {
        // console.error("Prayers data is not available.");
    } else if (!prayer_type || !prayers.hasOwnProperty(prayer_type)) {
        // console.error(`Invalid prayer type: ${prayer_type}`);
    } else {
        try {
            prayer = prayers[prayer_type];
        } catch (error) {
            // console.error("An error occurred while fetching the prayer data:", error);
        }
    }
</script>

<div id="prayer_intro_header">
        <div>
            <hgroup style="margin-bottom: 15px;">
                <h3>
                    {prayer.name}
                </h3>
                <h4>
                    {prayer.timing}
                </h4>
            </hgroup>

            <span
            style="
            font-size: 1rem;
            "
            >
                {prayer.description}
            </span>
        </div>

</div>


<style>
    #prayer_intro_header{
        background-color:none;
        margin-bottom: 30px;
    }

    img {
        width: 15vw;
        background-color:none;
    }

</style>