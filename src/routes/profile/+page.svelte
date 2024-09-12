<script>
    import Footer from "../../components/Footer.svelte";
import Navbar from "../../components/Navbar.svelte";
    import user from "../../stores/auth";
    import CodingProblem from "../../components/CodingProblem.svelte";
  import LoginWrapper from "../../components/LoginWrapper.svelte";

    let API_URL = import.meta.env.VITE_API_URL;

    let user1;
    let userInfo;
    let uploadProblems;
    let solvedProblems;

    let uploadProblemsNext;
    let solvedProblemsNext; 
    let loadingMore = false;

    let activeTab = "solved";

    user.subscribe((value) => {
      if (value) {
        user1 = JSON.parse(value);
        userInfo = user1.user;
      } else {
      }
    });
    
  
    async function fetchUserUploaded() {
      let response = await fetch(
        API_URL+ `editor/codingproblems/?creator=${userInfo.id}`
      );
      let data = await response.json();
      uploadProblems = data.results;
      uploadProblemsNext = data.next;
    }
    async function fetchUserSolved() {
      let response = await fetch(
        API_URL + `editor/userproblems/?user=${userInfo.id}`
      );
      let data = await response.json();
      solvedProblems = data.results;
      solvedProblemsNext = data.next;
    }
    if (userInfo) {
      fetchUserUploaded();
      fetchUserSolved();
    }



    const loadMoreSolved = () => {
      loadingMore = true
      // console.log(next);
      fetch(solvedProblemsNext)
      .then(async (response) => {
        if (response.ok) {
          let data1 = await response.json();
          solvedProblems =[...solvedProblems, ...data1.results];
          solvedProblemsNext = data1.next;
          loadingMore = false
         } 
      }).catch(error=>{ loadingMore=false })
    }

    const loadMoreUpload = () => {
      loadingMore = true
      // console.log(next);
      fetch(uploadProblemsNext)
      .then(async (response) => {
        if (response.ok) {
          let data1 = await response.json();
          uploadProblems =[...uploadProblems, ...data1.results];
          uploadProblemsNext = data1.next;
          loadingMore = false
         } 
      }).catch(error=>{ loadingMore=false })
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
        Profile
      </li>
    </ul>
  </div>

<LoginWrapper>
  <div class="mt-24">
  <div class="relative shadow rounded-lg md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
    <div class="flex justify-center">
        <img src={userInfo.profile_pic || "profile.png"} 
        alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110">
    </div>
    
    <div class="mt-16">
        <h1 class="font-bold text-center text-3xl">{userInfo.firstname} {userInfo.lastname}</h1>
        <p class="text-center text-sm font-medium">{userInfo.email}</p>
      
        <!-- <div class="my-5 px-6">
            <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Connect with <span class="font-bold">@pantazisoft</span></a>
        </div> -->
        <!-- <div class="flex justify-between items-center my-5 px-6">
            <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
            <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
            <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
            <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>
        </div> -->


        <div class="tabs w-full mt-8">
          <button on:click={()=>{activeTab="solved"}} class={activeTab=="solved"?"tab tab-lifted tab-active":"tab tab-bordered"}>Solved Coding Problems</button> 
          <button on:click={()=>{activeTab="added"}} class={activeTab=="added"?"tab tab-lifted tab-active":"tab tab-bordered"}>Added Coding Problems</button> 
        </div>

        <div class="w-full bg-base-100 p-6">
            {#if activeTab=="solved"}

              {#if solvedProblems?.length>0}

              <table class="table">
                <thead>
                  <tr>
                    <th>STATUS</th>
                    <th>PROBLEM</th>
                    <th>CREATED BY</th>
                  </tr>
                </thead>
            
                <tbody>
    
                {#each solvedProblems as item, key}
                    <CodingProblem item={item.problem} key={key} />
    
                {/each}
    
                
            </tbody>
    
            </table>

              <!-- {#each solvedProblems as item, key}
                  <CodingProblem item={item.problem} key={key} />
              {/each} -->

              {#if solvedProblemsNext}
                <div class="row flex-center">
                  {#if loadingMore} <p>loading...</p> {/if}
                  {#if !loadingMore}<button on:click={loadMoreSolved} class="btn btn-seconday">Load More</button>{/if}
                </div>
                {/if}

              {:else}
                <p class="mt-4">
                  You have not solved any problem yet
                </p>
              {/if}

            {:else}

            {#if uploadProblems?.length>0}

            <table class="table">
              <thead>
                <tr>
                  <th>STATUS</th>
                  <th>PROBLEM</th>
                  <th>CREATED BY</th>
                </tr>
              </thead>
          
              <tbody>
  
              {#each uploadProblems as item, key}
                  <CodingProblem item={item} key={key} />
  
              {/each}
  
              
          </tbody>
  
          </table>

              <!-- {#each uploadProblems as item, key}
                  <CodingProblem item={item} key={key} />
              {/each} -->

              {#if uploadProblemsNext}
                <div class="row flex-center">
                  {#if loadingMore} <p>loading...</p> {/if}
                  {#if !loadingMore}<button on:click={loadMoreUpload} class="btn btn-seconday">Load More</button>{/if}
                </div>
                {/if}

              {:else}
                <p class="mt-4">
                  You have not added any coding problem yet
                </p>
              {/if}

            {/if}
        </div>
    </div>


</div>

<br>
<br>
  </div>

</LoginWrapper>

</div>

<Footer />
