<script lang="ts">
    import { page } from '$app/stores';
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';

    let errorCode : number = $page.status;

    // Mapping of common HTTP error codes to messages
    const errorMessages = {
        400: {
            main: 'Bad Request',
            sub: 'The request could not be understood by the server.'
        },
        401: {
            main: 'Unauthorized',
            sub: 'You must authenticate yourself to get the requested response.'
        },
        403: {
            main: 'Forbidden',
            sub: 'You do not have permission to access the requested resource.'
        },
        404: {
            main: 'Page Not Found',
            sub: 'Please check if the web address is correct.'
        },
        500: {
            main: 'Internal Server Error',
            sub: 'The server has encountered a situation it doesn\'t know how to handle.'
        },
    };

    // Get the corresponding messages for the current error code
    let errorMessage = errorMessages[errorCode]?.main || 'Unknown Error';
    let errorSubMessage = errorMessages[errorCode]?.sub || 'An unexpected error occurred.';

</script>

<Header/>

<div class="container">
    <hgroup>
        <h2>
            {errorMessage}
        </h2>
        <h3>
            {errorSubMessage}
        </h3>
    </hgroup>

    <a href="/">
        back to safety
    </a>
</div>

<Footer/>
