<script lang="ts">
    import {prayers} from "../../../data/prayers/prayer_intro";

    export let prayer_name;

    let prayer;

    if (!prayers) {
        // console.error("Prayers data is not available.");
    } else if (!prayer_name || !prayers.hasOwnProperty(prayer_name)) {
        // console.error(`Invalid prayer type: ${prayer_name}`);
    } else {
        try {
            prayer = prayers[prayer_name];
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