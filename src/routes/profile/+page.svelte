<script>
  import Navbar from "../../components/Navbar.svelte";
  import user from "../../stores/auth";
  import { writable } from "svelte/store";
  let isLoading = true;
  let user1;
  let userInfo;
  let ProblemCount;
  let uploadProblems;
  let solvedProblemCount;
  let solvedProblems;
  let userSolved = false;
  user.subscribe((value) => {
    if (value) {
      user1 = JSON.parse(value);
      userInfo = user1.user;
      isLoading = false;
      //   console.log(userInfo)
      //   console.log(user1)
    }
  });
  let page = 1;
  function prevPage() {
    page = page - 1;
    fetchUserSolved();
  }
  function nextPage() {
    page = page + 1;
    fetchUserSolved();
  }
  function userSolvedProb() {
    userSolved = true;
  }
  function userUploadProb() {
    userSolved = false;
  }

  async function fetchUserUploaded() {
    let response = await fetch(
      `https://cc-dev.up.railway.app/api/v1/editor/codingproblems/?creator=${userInfo.id}&page=${page}`
    );
    ProblemCount = await response.json();
    uploadProblems = ProblemCount.results;
  }
  async function fetchUserSolved() {
    let response = await fetch(
      `https://cc-dev.up.railway.app/api/v1/editor/userproblems/?user=${userInfo.id}&page=${page}`
    );
    solvedProblemCount = await response.json();
    solvedProblems = solvedProblemCount.results;
  }
  if (userInfo) {
    fetchUserUploaded();
    fetchUserSolved();
  }
</script>

<Navbar />
{#if isLoading}
  <p>Lading</p>
{:else if userInfo && ProblemCount && solvedProblemCount}
  <main class="container">
    <div class="profile">
      <img
        class="profile-picture"
        src={userInfo.profile_pic || "profile.png"}
        alt=""
        role="presentation"
      />
      <div class="user-details">
        <h2>{userInfo.firstname} {userInfo.lastname}</h2>
        <p class="username">@{userInfo.firstname}{userInfo.lastname}</p>
        <div class="problem-stats">
          <div class="problem-stat">
            <a href="/myProblempets">
              <h2>{ProblemCount.count}</h2>
            </a>
            <p>Your Problems</p>
          </div>
          <div class="problem-stat">
            <h2>{solvedProblemCount.count}</h2>
            <p>Your solved Problems</p>
          </div>
        </div>
      </div>
    </div>
    {#if solvedProblemCount.count > 0}
      <div class="container problem-container">
        <button on:click={userUploadProb}>Your Problems</button>
        <button on:click={userSolvedProb}>Your Solved Problems</button>
        {#if userSolved}
          {#each solvedProblems as solvedProblem}
            <h4>{solvedProblem.problem.name}</h4>
          {/each}
          {#if solvedProblemCount.previous}
            <button on:click={prevPage}>Previous</button>
          {/if}
          {#if solvedProblemCount.next}
            <button on:click={nextPage}>Next</button>
          {/if}
        {:else}
          {#each uploadProblems as uploadProblem}
            <h4>{uploadProblem.name}</h4>
          {/each}

          {#if uploadProblems.previous}
            <button on:click={prevPage}>Previous</button>
          {/if}
          {#if uploadProblems.next}
            <button on:click={nextPage}>Next</button>
          {/if}
        {/if}
      </div>
    {/if}
  </main>
{/if}

<style>
  i {
    font-size: 16px;
  }
</style>
