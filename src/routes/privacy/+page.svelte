<script>
    import Header from '../Header.svelte';
    import Footer from '../Footer.svelte';

    let breadcrumbs = [
        { url: '/', text: 'Home' },
        { url: '/privacy', text: 'Privacy Policy' },
    ];
</script>

<Header {breadcrumbs}/>

<main>
    <div class="container">
        
        <section>
            <h3>
                Privacy Policy
            </h3>
            <p>
                Our website does not collect any personal data from our users. 
            </p>
            <p>
                We do not use cookies or any other tracking technologies. 
            </p>
        </section>

        
    </div>
</main>

<Footer/>

