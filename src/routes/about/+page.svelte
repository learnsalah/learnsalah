<script>
    import Header from '../Header.svelte';
    import Footer from '../Footer.svelte';

    let breadcrumbs = [
        { url: '/', text: 'Home' },
        { url: '/about', text: 'About us' },
    ];
</script>

<Header {breadcrumbs}/>

<main>
    <div class="container">
        
        <section>
            <h3>
                What is <em>Learn Salah</em>?
            </h3>
            <ul>
                <li>
                    <em>Learn Salah</em> is an open-source,
                    non-profit website, aimed at imparting knowledge 
                    on the Islamic act of devotion - Salah.
                </li>
                <li>
                    <em>Learn Salah</em> was launched in 2023, envisioned as a 
                    digital alternative to the traditional prayer mats 
                    illustrating prayer procedures and a host of often 
                    neglected, unintuitive native apps. 
                    Our commitment to a web-first, open-source approach 
                    aims to address these shortcomings.
                </li>
                <li>
                    Should you come across any inaccuracies, we warmly 
                    invite you to contact us without hesitation.
                </li>
            </ul>
        </section>
        
        <section>
            <h3>
                Contribute and Copy!
            </h3>
            
            <ul>
                <li>
                    We are fully 
                    <a href="https://github.com/learnsalah/learnsalah"
                    target="_blank">
                    open-source
                    </a>
                    and MIT-licensed!
                </li>
                <li>
                    If you're brimming with ideas, 
                    we'd love 
                    <a href="https://github.com/learnsalah/learnsalah/pulls"
                    target="_blank"
                    >
                    to hear from you and see your pull request!
                    </a>
                            
                </li>
                <li>
                    We also <strong>heartily encourage</strong> you to host your 
                    own versions of this website. 
                    By doing so, we can collectively ensure 
                    that a version of this website remains accessible at all times.        
                </li>
                <li>
                    For guidance on how to host your own version 
                    of <em>Learn Salah</em>, please refer to our 
                    <a href="https://github.com/learnsalah/learnsalah/blob/main/README.md" 
                    target="_blank">
                    GitHub Readme.
                    </a>
                </li>
            </ul>
            
        </section>

    </div>
</main>

<Footer/>
