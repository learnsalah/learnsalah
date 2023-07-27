<script>
    import Header from '../Header.svelte';
    import Footer from '../Footer.svelte';

    let breadcrumbs = [
        { url: '/', text: 'Home' },
        { url: '/contact', text: 'Contact us' },
    ];
</script>

<Header {breadcrumbs}/>

<main>
    <div class="container">
        
        <section>
            <h3>
                Contact us!
            </h3>
            <p>
                We're a decentralised community effort, 
                which means that there 
                isn't a single individual who owns, represents 
                or is accountable for Learn Salah.
            </p>
            
            <p>
                Should you encounter any problems, please don't 
                hesitate to open an issue here:
            </p>

            <a 
            href="https://github.com/learnsalah/learnsalah/issues"
            target="_blank">
                https://github.com/learnsalah/learnsalah/issues
            </a>
        </section>

        <div style="margin-top:45vh"></div>
        
    </div>
</main>

<Footer/>
