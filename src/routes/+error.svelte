<script>
    import { page } from '$app/stores';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<Header/>

<div class="container">
    <h2>
        Application Error:
        {$page.error.message}
    </h2>
    <h3>
        <a href="/">
            back to safety
        </a>
    </h3>
</div>

<Footer/>