<script>
    import CodingProblem from "./CodingProblem.svelte";

    let API_URL = import.meta.env.VITE_API_URL;


    export let data;
    

    let data1 = data?.results;
    let next = data?.next;
    let loading = false;
    let loadingMore = false;
    let ordering = "updated";
    let level = "";



    /**
     * @type {never[]}
     */
    let dataNew = [];

    async function loadMore() {
        loadingMore = true;
        // console.log("Hello Bhai")
		const response = await fetch(next);
		let dataNew = await response.json();
        // console.log(dataNew);
        data1 = [...data1,...dataNew.results];
        next = dataNew.next;
        loadingMore = false
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


<!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-6"> -->

    <div class="py-2">
            <label >
              <span class="label-text">Ordering: </span>
            </label>
            <select class="select select-sm select-bordered" on:change={e => changeOrder(e)} >
                    <option value="updated">Old First</option>
                    <option value="-updated">New First</option>
            </select>

            <label>
              <span class="label-text">Select Difficulty: </span>
            </label>
            
            <select class="select select-sm select-bordered" on:change={e => changeLevel(e)}>
                <option value="">All</option>
                <option value="very easy">Very Easy</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
    </div>
    <div class="col-span-3">

        {#if loading}
            <p class="py-4">Loding...</p>
        {/if}

        {#if (data1.length===0 && !loading)}
            <p>Coding Problem is not available.</p>
        {/if}

        {#if !loading}
        <table class="table">
            <thead>
              <tr>
                <th>STATUS</th>
                <th>PROBLEM</th>
                <th>CREATED BY</th>
              </tr>
            </thead>
        
            <tbody>

            {#each data1 as item, key}
                <CodingProblem item={item} key={key} />

            {/each}

            {#if loadingMore}
                <p class="py-4">Loading..</p>
            {/if}
        </tbody>

        </table>

        {/if}



        
    {#if (next && !loadingMore && !loading)}
        <button class="btn btn-sm my-4" on:click={loadMore}>Load More</button>
    {/if}

    

    <!-- </div> -->
  </div>