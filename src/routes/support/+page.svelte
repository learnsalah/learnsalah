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
                
            </ul>




        </section>

        <div style="display: flex; justify-content:flex-start;margin-top:60px;margin-bottom: 60px;">
            <a href="https://coindrop.to/learnsalah" target="_blank">
                <img src="https://coindrop.to/embed-button.png" style="border-radius: 10px; height: 57px !important;width: 229px !important;" alt="Coindrop.to me"/>
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
                                $24/mo.
                            </strong>
                            Akamai Linode 4GB VM
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
