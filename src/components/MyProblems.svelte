<script>
  import { onMount } from 'svelte';
  import user from '../stores/auth';
  import { writable } from 'svelte/store';
  import { postDataAuth , delete } from '../utils/auth';

  let userProblems = [];
  let userSolvedProblems = [];
  let showProblems = true;
  let user1 = writable();
  let userInfo = writable();

  user.subscribe((value) => {
    if (value) {
      user1 = JSON.parse(value);
      userInfo = user1.user;
    }
  });

  onMount(() => {
    fetchUserProblems();
  });
  async function deleteProblem(problemId) {
  try {
    const response = await fetch(
      `https://cc-dev.up.railway.app/api/v1/editor/userproblems/`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user1.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user_id": userInfo.id,
          problem_id: problemId,
        }),
      }
    );

    if (response.ok) {
      console.log('Problem deleted successfully');
    } else {
      console.error('Failed to delete problem');
    }
  } catch (error) {
    console.error('Failed to delete problem', error);
  }
}


  async function fetchUserProblems() {
    try {
      const response = await fetch(
        `https://cc-dev.up.railway.app/api/v1/editor/codingproblems/?creator=${userInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${user1.access}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        userProblems = data.results;
      } else {
        console.error('Failed to fetch user problems');
      }
    } catch (error) {
      console.error('Failed to fetch user problems', error);
    }
  }
  let page = 1
  function paginationNext(){
      page = page +1
      fetchUserSolvedProblems()
  }
  function paginationPrev(){
      page = page -1
      fetchUserSolvedProblems()
  }

  async function fetchUserSolvedProblems() {
    try {
      const response = await fetch(
        `https://cc-dev.up.railway.app/api/v1/editor/userproblems/?user=${userInfo.id}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${user1.access}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        userSolvedProblems = data.results;
        console.log(userSolvedProblems);
      } else {
        console.error('Failed to fetch user solved problems');
      }
    } catch (error) {
      console.error('Failed to fetch user solved problems', error);
    }
  }

  function toggleProblems() {
    showProblems = true;
    fetchUserProblems();
  }

  function toggleSolvedProblems() {
    showProblems = false;
    fetchUserSolvedProblems();
  }
</script>


<main class="section">
  <div class="container myproblem-container ">
    <div class="inline">
      <button class="{showProblems ? 'active' : ''}" on:click={toggleProblems}>
        Your Problems
      </button>
      <button class="{!showProblems ? 'active' : ''}" on:click={toggleSolvedProblems}>
        Your Solved Problems
      </button>
    </div>
    {#if showProblems}
      {#if userProblems.length > 0}
        <div class="problem-list">
          <h2>Your Problems</h2>
          <ol>
            {#each userProblems as problem, index}
              <li>
                <div class="problem">
                  <h4 class="margin-bottom-none">
                    <span class="serial-number">{index + 1}_</span>
                    <a href={"/coding-problem/"+problem.slug}>{problem.name}</a>
                    <button class="action-btn"  on:click={()=>{deleteProblem(problem.id)}}>Delete</button>

                  </h4>
                </div>
              </li>
            {/each}
          </ol>
      

        </div>
      {:else}
        <p>Loading problems...</p>
      {/if}
    {:else}
      {#if userSolvedProblems.length > 0}
        <div class="problem-list">
          <h2>Your Solved Problems</h2>
          <ol>
            {#each userSolvedProblems as problem, index}
              <li>
                <div class="problem">
                  <h4 class="margin-bottom-none">
                    <span class="serial-number">{index + 1}_</span>
                    <a href={"/coding-problem/"+problem.problem.slug}>{problem.problem.name}</a>
                   
                  </h4>
                </div>
              </li>
            {/each}
          </ol>
        </div>
        <button class="" on:click={paginationPrev}>Previous</button>
        <button class="" on:click={paginationNext}>Next</button>
      {:else}
        <p>Loading solved problems...</p>
      {/if}
    {/if}
  </div>
</main>


