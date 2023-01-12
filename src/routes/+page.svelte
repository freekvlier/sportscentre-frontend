<script>
    import {signIn, myMSALObj, tokenRequest, } from '../auth.js';
    import {loggedInCheck} from '../services/user-service.js'
    import { onMount } from 'svelte';

    function login(){
        signIn();
        loginCheck();
    }

    onMount(() => {
        loggedInCheck().then(test => console.log(test));
    });
</script>

<h1>SportsCentre</h1>
<p>Portal</p>
<button on:click={login}>
	Login
</button>

<button on:click={login}>
	test
</button>