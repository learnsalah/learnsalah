<script>
    import Header from '../../Header.svelte';
	import PrayerHeader from './PrayerHeader.svelte';
	import PrayerStartButton from './PrayerStartButton.svelte';

    export let data;

</script>

<Header />

<main>
   <div class="container">

        <PrayerHeader prayer_type={data.prayer.name}/>
        
        <div>
            
            <span style="font-weight: 500;display:block;margin-bottom:20px;">
                Before praying, ensure that:
            </span>

            <ul>
                <li>
                    You have performed the Wudu
                </li>
                <li>
                    You are facing the Qibla
                </li>
                <li>
                    Your attire is clean and covers the Awrah
                </li>
                <li>
                    The place where you are praying is clean and free from impurities
                </li>
                <li>
                    You have the intention (Niyyah) to pray
                </li>
            </ul>
        </div>
        

        <div style="margin-top: 40px;">
            <div style="display: flex; justify-content: space-between; align-items:center;">
                <a href="/">
                    back
                </a>
                <PrayerStartButton prayer={data.prayer.name} />
            </div>
        </div>



   </div>
</main>


