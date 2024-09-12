<script>
    import Navbar from '../../components/Navbar.svelte';

    import Footer from '../../components/Footer.svelte';
    import LoginWrapper from '../../components/LoginWrapper.svelte';
    import user from '../../stores/auth';

    import { onMount } from 'svelte';

    let API_URL = import.meta.env.VITE_API_URL;

    let user1;
    
    user.subscribe((value) => {
      if (value) {
        user1 = JSON.parse(value);
      } else {
      }
    });

    let userPoints = [];
    let loading = false;
    let loadingMore = false;

    let next;

    async function fetchUserPoints(url) {
        const response = await fetch(url);
        const data = await response.json();
        userPoints = [...userPoints, ...data.results];
        next = data.next;
        return data;
    }

    onMount(async () => {
        loading = true;
        await fetchUserPoints(API_URL + "auth/userpoints/?user=" + user1.user.id);
        loading = false;
    });

    async function loadMore() {
        if (next) {
            loadingMore = true;
            await fetchUserPoints(next);
            loadingMore = false;
        }
    }

</script>


<Navbar />

<div class="px-4">

<div class="text-sm breadcrumbs">
  <ul>
    <li>
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </a>
    </li> 
     
    <li>
      CC Coins
    </li>
  </ul>
</div>

<LoginWrapper>
    {#if loading}
        <div class="flex justify-center items-center h-screen">
            <div class="spinner spinner-primary"></div>
        </div>
    {:else}


    
        <div class="md:w-1/2 m-auto h-screen">
            <h1 class="text-2xl font-bold">CC Coins: {user1.user.total_points}</h1>
            {#each userPoints as point}
                <div class="w-full bg-base-200 bg-opacity-80 rounded-lg p-4 mt-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                    <h2 class="card-title text-lg font-semibold mb-2">{point.reason}</h2>
                    <div class="flex justify-between items-center text-sm opacity-80">
                        <p class="font-medium">Points: <span class="text-primary">{point.point}</span></p>
                        <p class="text-opacity-70">{new Date(point.datetime).toLocaleString()}</p>
                    </div>
                </div>
            {/each}

            {#if next}
            <div class="mt-4 text-center">
                <button class="btn btn-primary" on:click={loadMore} disabled={loadingMore}>
                    {loadingMore ? 'Loading...' : 'Load More'}
                </button>
                </div>
            {/if}
            
        </div>

    {/if}




</LoginWrapper>




</div>

<Footer />

