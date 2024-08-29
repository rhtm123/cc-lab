

<script>

export let data;

    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    onMount(()=>{
      goto("/online-editor/"+data.lang.prog_lang + "/" + data.slug);
    })



</script>

<p class="p-4">Redirecting to editor page..</p>
