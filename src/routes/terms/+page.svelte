<script>
    import Header from '../Header.svelte';
    import Footer from '../Footer.svelte';

    let breadcrumbs = [
        { url: '/', text: 'Home' },
        { url: '/terms', text: 'Terms and Conditions' },
    ];
</script>

<Header {breadcrumbs}/>

<main>
    <div class="container">
        
        <section>
            <h3>
                Terms and Conditions
            </h3>
                <p>
                    By using our website, you agree to the following terms and conditions:
                </p>
                <ol>
                    <li>
                        The content on our website is provided on an 'as is' basis. We make no warranties regarding the accuracy or completeness of our content and disclaim all liability for any errors or omissions.
                    </li>
                    <li>
                        We reserve the right to modify, suspend, or discontinue our website at any time, without notice.
                    </li>
                    <li>
                        Our website may contain links to other websites. We are not responsible for the content, privacy policies, or practices of these websites.
                    </li>
                    <li>
                        By using our website, you agree to not use our website for any unlawful purpose, and you agree to comply with all local laws and regulations.
                    </li>
                </ol>



        </section>

        
    </div>
</main>

<Footer/>

