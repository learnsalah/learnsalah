<script>
    export let prayerTime;

    let hours = prayerTime.getHours();
    let min = prayerTime.getMinutes();
</script>

<div>
    {`${hours % 12 || 12}:${min < 10 ? '0' + min : min} ${hours < 12 ? 'AM' : 'PM'}`}
</div>

<style>
    div{
        min-width: 100px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 700;
        font-size: 1rem;
        line-height: 1.85rem;
        display: inline-flex;
        justify-content: center;
        margin-top: 0;
        margin-left: 0;
        padding: 8px 10px 7px;
    }

</style>