<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(()=>{
      goto("/online-editor")
    })

</script>

<p class="p-8">Redirecting to /online-editor. </p>