<script>
    import Header from '../Header.svelte';
    import Footer from '../Footer.svelte';
    
    let breadcrumbs = [
    { url: '/', text: 'Home' },
    { url: '/attribution', text: 'Attribution' },
    ];
</script>

<Header {breadcrumbs}/>

<main>
    <div class="container">
        <h3>
            Attribution
        </h3>

        <ul>
            <li>
                Several vectors and icons by <a href="https://www.figma.com/community/file/1166831539721848736?ref=svgrepo.com" target="_blank">Solar Icons</a>
                and <a href="https://www.figma.com/@thinkcly?ref=svgrepo.com" target="_blank">Konstantin Filatov</a>  in CC Attribution License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>
            </li>
            <li>
                Prayer time calculation using <a href="https://github.com/batoulapps/adhan-js">adhan-js</a>
            </li>
            <li>
                The
                <a href="https://github.com/twitter/twemoji/blob/master/assets/svg/1f932.svg"> 
                    emoji graphic
                </a> 
                for the favicon is from the open source project 
                <a href="https://twemoji.twitter.com/">
                    Twemoji
                </a>
                . The graphic is copyright 2020 Twitter, Inc and other contributors. 
                The graphic is licensed under 
                <a href="https://creativecommons.org/licenses/by/4.0/">
                    CC-BY 4.0
                </a>
            </li>
        </ul>
        
    </div>
</main>

<Footer/>
