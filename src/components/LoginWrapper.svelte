<script>
// @ts-nocheck

    // @ts-ignore
    import { onMount, onDestroy } from 'svelte';
    import user from '../stores/auth'; // Import the user store
    import LoginRequired from './LoginRequired.svelte';

    // @ts-ignore
    let user1 = null; // Hold the user data or null
    let isLoading = true; // Loading state to show the loader initially

    // Subscribe to the user store to check if the user is authenticated
    const unsubscribe = user.subscribe(value => {
        if (value) {
            user1 = JSON.parse(value);
        } else {
            user1 = null;
        }

        // Ensure that isLoading is set to false only after processing the user data
        isLoading = false;
    });

    // Clean up the subscription when the component is destroyed
    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if isLoading}
    <!-- Show a loading indicator while checking authentication -->
    <p>Loading...</p>
{:else}
    {#if user1}
        <!-- If the user is authenticated, show the slot content -->
        <slot />
    {:else}
        <!-- If not authenticated, show the LoginRequired component -->
        <LoginRequired />
    {/if}
{/if}