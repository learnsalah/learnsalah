<script lang="ts">
    
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import PrayerTimeIndicator from './PrayerTimeIndicator.svelte';
    import PrayerStartButton from './PrayerStartButton.svelte';
    import LocationButton from './LocationButton.svelte';
    import Modal from './Modal.svelte';
    import SettingsModal from './SettingsModal.svelte';
    import SettingsButton from './SettingsButton.svelte';
    
    let prayerTimes = null;
    
    let showSettingsModal : boolean = false;
    
</script>


<Header/>

<main class="container">

    <div style="padding: 10px 0 50px 0; text-align:center; display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div style="font-size:2rem; font-weight:700;color:var(--green);">
            The 
            fun
            and 
            <span style="text-decoration: underline; text-decoration-color:var(--green);">free</span> 
            way to learn prayer.
        </div>
        <div style="font-weight:400;font-size:1.1rem;color:var(--green);">
            Select any prayer below to get started.
        </div>
    </div>

    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div>
            <div style="display:inline-flex;">
                <PrayerStartButton prayer="fajr" />
                
                {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.fajr}/>
                {/if}
            </div>
        </div>
        
        <div>
            <div style="display:inline-flex;">
                <PrayerStartButton prayer="dhuhr" />
                {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.dhuhr}/>
                {/if}
            </div>
        </div>
        
        <div>
            <div style="display:inline-flex;">
                <PrayerStartButton prayer="asr" />
                {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.asr}/>
                {/if}
            </div>
        </div>
        
        <div>
            <div style="display:inline-flex;">
                <PrayerStartButton prayer="maghrib" />
                {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.maghrib}/>
                {/if}
            </div>
        </div>
        
        <div>
            <div style="display:inline-flex;">
                <PrayerStartButton prayer="isha" />
                {#if prayerTimes != null}
                <PrayerTimeIndicator prayerTime={prayerTimes.isha}/>
                {/if}
                
            </div>
        </div>
    </div>

    <div style="margin-top: 35px;"></div>
    
    <LocationButton bind:prayerTimes={prayerTimes}/>
    
    <SettingsButton bind:showSettingsModal={showSettingsModal}/>

    <Modal bind:showModal={showSettingsModal}>
        <a slot="back-link" >back</a> 
        <SettingsModal/>
    </Modal>
    

    <div style="padding: 100px 0 50px 0; display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div style="background-color: var(--green); width:45px; height:10px; margin-bottom:20px;"></div>
        <h2 style="font-size:2rem; font-weight:700; color:var(--green); margin-bottom: 30px; line-height: 1.3;">
            Our Mission
        </h2>
    </div>

    <div class="grid">
        <div>
            
        </div>
        <div>
            <hgroup>
                <h3>Inspire</h3>
                <h4>
                    Teaching islamic prayer for inner peace and communal harmony.
                </h4>
            </hgroup>
        </div>
    </div>

    <div class="grid">
        <div>
            <hgroup>
                <h3>Unite</h3>
                <h4>
                    Building bridges across cultures through the universal message of Islam.
                </h4>
            </hgroup>
        </div>
        <div>
            
        </div>
    </div>

    <div class="grid">
        <div>
            
        </div>
        <div>
            <hgroup>
                <h3>Transform</h3>
                <h4>
                    We advocate the transformative power of mindful devotion, accessible to all, anytime, anywhere, without a price.
                </h4>
            </hgroup>
        </div>
    </div>

    <div style="text-align: center; display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <p style="margin: 40px 0 30px 0; width:60vw;">
            Whether you're taking your first steps in prayer or have already embraced it, you're in the right place.
        </p>
        <div class="button button--secondary">
            Pray Now
        </div>
    </div>


    <div style="padding: 100px 0 50px 0; display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <div style="background-color: var(--green); width:45px; height:10px; margin-bottom:20px;"></div>
        <h2 style="font-size:2rem; font-weight:700; color:var(--green); margin-bottom: 30px; line-height: 1.3;">
            Support Us
        </h2>
    </div>
    
    
    

</main>


<Footer/>
