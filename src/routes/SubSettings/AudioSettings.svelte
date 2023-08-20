<script lang="ts">
    import audioStore from "$lib/stores/audio/audioStore";

    let speaker = $audioStore.speaker; // name of speaker

    const changeSpeaker = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        speaker = target.value;
        audioStore.update(currentSettings => ({
            ...currentSettings,
            speaker: speaker
        }));
    }
</script>

<hgroup>
    <h2>Audio Settings</h2>
    <h3>Personalise your prayer audio preferences.</h3>    
</hgroup>

<hr>

<hgroup>
    <h6>Speaker Selection</h6>
    <h6>Select the speaker to recite during prayer</h6>
</hgroup>

<select id="speaker" bind:value={speaker} on:change={changeSpeaker} required>
  <option value="audio_1" selected={speaker === 'audio_1'}>Abubakr Elmallah (With Tajweed)</option>
  <option value="audio_2" selected={speaker === 'audio_2'}>Abubakr Elmallah (Without Tajweed)</option>
</select>
