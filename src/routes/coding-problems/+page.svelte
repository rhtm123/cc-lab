<script>
// @ts-nocheck

    import Navbar from "../../components/Navbar.svelte";

    // import { API_URL } from "$env/static/public";
    let API_URL = import.meta.env.VITE_API_URL;


    // let API_URL = "https://codingchaska.up.railway.app/api/v1/"

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

<Navbar />

<ul class="breadcrumb">
    <li><a href="/">Home</a></li>
    <li>Coding Problems</li>
</ul>

<div class="container section">
    <div class="row">
        <div class="col-3">
            <p class='text-grey'>Ordering: </p>
                      
                <div>
                    <select on:change={e => changeOrder(e)} class='select'>
                        <option value="updated">Old First</option>
                        <option value="-updated">New First</option>
                    </select>
                </div>
            
                <p>Select Difficulty: </p>
                      
                <div>
                    <select on:change={e => changeLevel(e)}>
                        <option value="">All</option>
                        <option value="very easy">Very Easy</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

        </div>

        <div class="col-9">

            {#if (data1.length===0 && !loading)}
                <p>Coding Problem is not available.</p>
            {/if}

            {#each data1 as item, key}
            <div>
                <h4 class="margin-bottom-none">{key+1}_ <a href={"/coding-problem/"+item.slug}>{item.name}</a></h4>
                <p>Created by- {item.creator.firstname} {item.creator.lastname}</p>
            </div>
        {/each}
    
        {#if (next && !loading)}
            <br />
            <button on:click={loadMore}>Load More</button>
        {/if}
    
        {#if loading}
            <br />
            <p>Loading...</p>
        {/if}
            
        </div>
    </div>



</div>