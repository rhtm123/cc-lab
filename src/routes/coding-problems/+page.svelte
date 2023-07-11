<script>
// @ts-nocheck

    import CodingProblem from "../../components/CodingProblem.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";

    // import { API_URL } from "$env/static/public";
    let API_URL = import.meta.env.VITE_API_URL;

    /** @type {import('./$types').PageData} */
    export let data;
    let data1 = data.results;
    let next = data.next;
    let loading = false;
    let ordering = "updated";
    let level = "";

    /**
     * @type {never[]}
     */
    let dataNew = [];

    async function loadMore() {
        loading = true;
        // console.log("Hello Bhai")
		const response = await fetch(next);
		let dataNew = await response.json();
        // console.log(dataNew);
        data1 = [...data1,...dataNew.results];
        next = dataNew.next;
        loading = false
    }

    async function refresh() {
        let url2 = API_URL +`editor/codingproblems/?is_published=true&level=${level}&ordering=${ordering}`
        loading = true;
        data1 = []
        // console.log(url2);
		const response = await fetch(url2);
		let dataNew = await response.json();
        // console.log(dataNew);
        data1 = dataNew.results;
        next = dataNew.next;
        loading = false;
    }

    const changeLevel = (/** @type {Event & { currentTarget: EventTarget & HTMLSelectElement; }} */ e) => {
    // @ts-ignore
    level = e.target.value;
    refresh();
  }

  const changeOrder = (/** @type {{ target: { value: any; }; }} */ e) => {
    ordering = e.target.value;
    refresh();
  }




 </script>

  <svelte:head>
    <title>Coding Problems | Coding Chaska Lab </title>
    <meta property="description" content="Coding Problems - Python Basics, Python Decision Making, Python Loops, Python Functions, Python Native Data Types, Object Oriented Programming" />
  </svelte:head>


<Navbar />


<div class="container">
    <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              Home
            </a>
          </li> 
           
          <li>
            Coding Problems
          </li>
        </ul>
      </div>

      <br />

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div class="">
            <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Ordering: </span>
                </label>
                <select class="select select-bordered" on:change={e => changeOrder(e)} >
                        <option value="updated">Old First</option>
                        <option value="-updated">New First</option>
                </select>
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Select Difficulty: </span>
                </label>
                
                <select class="select select-bordered" on:change={e => changeLevel(e)}>
                    <option value="">All</option>
                    <option value="very easy">Very Easy</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
              </div>
        </div>
        <div class="col-span-3">
            {#if (data1.length===0 && !loading)}
                <p>Coding Problem is not available.</p>
            {/if}

            {#each data1 as item, key}
                <CodingProblem item={item} key={key} />
            {/each}
    
        {#if (next && !loading)}
            <button class="btn" on:click={loadMore}>Load More</button>
        {/if}
    
        {#if loading}
            <br />
            <p>Loading...</p>
        {/if}

        </div>
      </div>

</div>

<br />
<Footer />