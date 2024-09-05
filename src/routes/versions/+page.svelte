

<script>
  import Footer from "../../components/Footer.svelte";
import Navbar from "../../components/Navbar.svelte";
  import { onMount } from "svelte";
  let API_URL = import.meta.env.VITE_API_URL;



let versions = [];
let next = "";
let loading = false;
let loadingMore = false;
let ordering = "created";

  async function loadMore() {
        loadingMore = true;
        // console.log("Hello Bhai")
		const response = await fetch(next);
		let dataNew = await response.json();
        // console.log(dataNew);
        versions = [...versions,...dataNew.results];
        next = dataNew.next;
        loadingMore = false
    }

    async function fetchData(){
        let url = API_URL+"version/versions/?app_name=cclab&ordering=-created";
        try {
        loading = true;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        versions = data.results;
        next = data.next;
        } catch (e) { 
            console.log(e, "Error fetching data")
        } finally{
            loading = false;
        }

    }



  onMount(()=>{
    fetchData();
  })

  </script>


<head>
    <!-- Primary Meta Tags -->
    <title>App Version History | Coding Chaska Lab</title>
    <meta name="description" content="Explore the version history of Coding Chaska Lab. Stay updated with the latest features, improvements, and bug fixes in each release.">
    <meta name="keywords" content="App Version History, Release Notes, Software Versions, App Updates, Change Log, Coding Chaska Lab">
    <meta name="author" content="Coding Chaska">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
    <!-- Open Graph / Facebook -->
    <meta property="og:title" content="App Version History | Coding Chaska Lab">
    <meta property="og:description" content="Explore the version history of Coding Chaska Lab. Stay updated with the latest features, improvements, and bug fixes in each release.">
    <meta property="og:url" content="https://www.codingchaskalab.com/versions">
    <meta property="og:type" content="website">
  
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="App Version History | Coding Chaska Lab">
    <meta name="twitter:description" content="Explore the version history of Coding Chaska Lab. Stay updated with the latest features, improvements, and bug fixes in each release.">
  
    <!-- Additional Meta Tags -->
    <link rel="canonical" href="https://www.codingchaskalab.com/versions">
    <meta name="robots" content="index, follow">
  </head>
  
  <Navbar />

  <section class="p-8 bg-base-100 min-h-screen">
    <div class="md:w-1/2 mx-auto">
      <h1 class="text-4xl font-bold mb-8">App Version History</h1>

      {#if loading}
            <p class="py-4">Loding...</p>
      {/if}

      {#each versions as version}
        <div class="mb-8 p-6 bg-base-200 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-2">Version {version.name}</h2>  
            <p class="text-gray-600 mb-4">Release Date: {version.release_date}</p>
            <div class="prose max-w-none">{@html version.detail}</div>
        </div>

        {#if loadingMore}
                <p class="py-4">Loading..</p>
        {/if}

      {/each}
      
      {#if (next && !loadingMore && !loading)}
            <button class="btn btn-sm my-4" on:click={loadMore}>Load More</button>
      {/if}
    </div>
  </section>

  <Footer />