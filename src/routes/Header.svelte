<script>
    export let breadcrumbs = []; // Define a prop for the breadcrumbs

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    }

</script>

<header>
    <div>   
        <div style="background-color:#218C74;">
            <div class="container" style="display:flex;justify-content:space-between;align-items:stretch;background-color:none;">
                <div>
                    <a href="/" id="logo">
                        Learn Salah 
                    </a>
                </div>

                <div 
                class="nav-item"
                class:nav-item-is-active={isMenuOpen}
                on:click={() => toggleMenu()}
                on:keyup={() => toggleMenu()}

                >
                    <span
                    class="nav-item-inner"
                    class:nav-item-inner-is-active={isMenuOpen}
                    >
                            Menu
                    </span>
                </div>
            </div>
        </div>

        {#if isMenuOpen}
            <div class="menu-outer">
                <div class="container">
                    <ul>
                        <li>
                            <a href="/about">About us</a>
                        </li>
                        <li>
                            <a href="/support">Support us</a>
                        </li>
                        <li>
                            <a 
                            href="https://github.com/learnsalah/learnsalah" 
                            target="_blank">Contribute</a>
                        </li>
                        <li>
                            <a href="/contact">Contact us</a>
                        </li>
                    </ul>
                </div>
            </div>
        {/if}


        {#if breadcrumbs.length > 0}
            <div class="container" style="margin-top: 20px;">
            {#each breadcrumbs as { url, text }, i (i)}
                {#if i !== 0} 
                    <svg
                    style="margin-left:8px;margin-right:2px;" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 23 40" 
                    focusable="false" aria-hidden="true">
                        <path   fill="#000" 
                                d="M0 0h8l15 20-15 20H0l15-20z">
                        </path>
                    </svg> 
                {/if}
                <a
                href={url}
                >{text}</a>
            {/each}
            </div>
        {/if}
            
    </div>
</header>

<style>

header{
    margin-bottom: 30px;
}

#logo {
    color: white;
    text-decoration:none;
    font-size: 30px;
    font-weight: 900;
    padding-top: 10px;
    padding-bottom: 10px;
    display: block;
}

#logo:hover {
    text-decoration: underline;
}
.nav-item {
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
}

.nav-item:hover {
    cursor: pointer;
    text-decoration: underline;
}

.nav-item-inner {
    display: inline-block;
    padding: 5px 20px; 
    font-weight: 500;
}

.nav-item-inner::before {
    -webkit-transform: translateY(-35%) rotate(45deg) scale(1);
    -ms-transform: translateY(-35%) rotate(45deg) scale(1);
    transform: translateY(-35%) rotate(45deg) scale(1);
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    content: "";
    display: inline-block;
    height: 8px;
    margin: 0 10px 0 2px;
    vertical-align: middle;
    width: 8px;
}

.nav-item-is-active {
    background-color: #f3f2f1;
    color: #1095c1;
}

.nav-item-inner-is-active::before{
    -webkit-transform: translateY(1px) rotate(225deg) scale(1);
    -ms-transform: translateY(1px) rotate(225deg) scale(1);
    transform: translateY(1px) rotate(225deg) scale(1);
    border-bottom: 2px solid #1095c1;
    border-right: 2px solid #1095c1;
}

.menu-outer {
    padding: 25px 0 25px 0;
    background-color: #f3f2f1;
}

.menu-outer ul {
    padding: 0;
}

.menu-outer li {
    list-style: none;
    margin: 5px 0 20px 0;
}

</style>
