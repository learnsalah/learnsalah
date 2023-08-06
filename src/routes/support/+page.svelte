<script>
    import Header from '../Header.svelte';
    import Footer from '../Footer.svelte';
    
    let breadcrumbs = [
    { url: '/', text: 'Home' },
    { url: '/support', text: 'Support us' },
    ];
</script>

<Header {breadcrumbs}/>

<main>
    <div class="container">
        
        <section>
            <h3>
                Support our mission
            </h3>
            <ul>
                <li>
                    <em>Learn Salah</em> is freely accessible to everyone
                </li>
                <li>
                    We operate <em>Learn Salah</em> as a non-profit website
                </li>
                <li>
                    Your generous donations help us meet our running costs
                </li>
                <li>
                    Any surplus funds are channelled into charitable activities
                </li>
                <li>
                    We uphold total transparency regarding our costs and the donations we receive
                </li>
                <li>
                    By donating, you're contributing to the upkeep of this server instance for Learn Salah
                </li>
                
            </ul>




        </section>

        <div style="display: flex; justify-content:flex-start;margin-top:60px;margin-bottom: 60px;">
            <a class="button flashy-border" target="_blank" href="https://ko-fi.com/learnsalah">
                Support Us Now
            </a>
        </div>
        
        <section>

            
            <div class="grid">
                <div>
                    <hgroup>
                        <h3>
                            Our Expenses
                        </h3>
                        <h4>
                            As of August 2023
                        </h4>
                    </hgroup>
                    <ul>
                        <li>
                            <strong style="color:#d63031;">
                                $17/mo.
                            </strong>
                            Akamai Linode 4GB VM + Back-Up
                        </li>
                        <li>
                            <strong style="color:#d63031;">
                                $24/yr.
                            </strong>
                            Domain Name Registar Fees
                        </li>
                    </ul>
                </div>
                <div>
                    <hgroup>
                        <h3>
                            Donations received
                        </h3>
                        <h4>
                            As of August 2023
                        </h4>
                    </hgroup>
                    <ul>
                        <li>-</li>
                    </ul>
                </div>
            </div>

 
            

        </section>
        
    </div>
</main>

<Footer/>

<style>

/* flashy button like its 1998 */

.flashy-border {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Adds a transition for smooth effect */
    overflow: hidden; /* To keep the border gradient inside the button */
    background: linear-gradient(90deg, #218c74 0%, #20bf6b 50%, #218c74 100%);
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0px 0px 16px 0px #20bf6b;
    border: 2px solid #218c74;
    background-clip: padding-box, border-box; /* Use the background on the border too */
    background-origin: border-box;
    animation: flashy 3s linear infinite;
}

.flashy-border:hover, .flashy-border:focus {
    transform: scale(1.05); /* Enlarges the button */
    box-shadow: 0px 0px 20px 3px #20bf6b; /* Makes the glow effect more intense */
}

@keyframes flashy {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
}

</style>