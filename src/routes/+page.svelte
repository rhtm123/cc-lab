
<script>
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";

  import { goto } from "$app/navigation";
  import Delete from "../components/svg/Delete.svelte";

  import { postDataAuth } from "../utils/auth";

  let API_URL = import.meta.env.VITE_API_URL;

  import { page } from '$app/stores';



  import { onMount } from "svelte";
  import user from "../stores/auth";
  let user1;
  let loading;
  let projects = [];
  let loadingMore;
  let next;
  let languages =[];

  user.subscribe(value => {
      if (value) {user1 = JSON.parse(value);}
      else{user1=null}
  });



  const getProjects = () => {
  loading = true;
  projects = [];
    let url = API_URL + `editor/projects/?type=project&creator=${user1.user.id}&lang=&ordering=-updated`;
    fetch(url)
    .then(async (response) => {
      if (response.ok) {
        let data1 = await response.json();
        loading = false;
        projects = data1.results;
        next = data1.next;
      } 
    }).catch(error=>{ loading=false })
  }

  onMount(async () => {
    getProjects();
  });

  onMount(async () => {   
  let url = API_URL + "editor/programming_langs/?is_project_lang=true";
  fetch(url)
    .then(async (response) => {
      if (response.ok) {
        let data1 = await response.json();
        languages = data1.results;
        // language = data1.results[0].id;
      } else {
      }
    }).catch(error=>{  }) 
  });

  const deleteProject = (id) => {
  loading = true;
  let url = API_URL + `editor/project/delete/${id}/`;
  postDataAuth(url,user1.access,{},'DELETE')
  .then(data2 => {
    getProjects();
    }).catch(error => {
  })
  }

  const creatProjectRedirect = () => {
  requesting = true
  let url = API_URL+ "editor/projects/";

  if (new_project_name===""){
    let error = {text:"Title name should not be emptied"}
    requesting = false;   
  } else {

  postDataAuth(url,user1.access,{name:new_project_name, creator_id:user1.user.id,lang_id:language})
  .then(data2 => {
  //   requesting = false  
      goto("/write-code-online/"+data2.slug)    
      console.log(data2)
    }).catch(error => {
      console.log(error)
  })
  }
  } 

  let new_project_name="";
  let language ="";
  let requesting=false;


  const loadMore = () => {
    loadingMore = true
    // console.log(next);
    fetch(next)
    .then(async (response) => {
      if (response.ok) {
        let data1 = await response.json();
        projects =[...projects, ...data1.results];
        next = data1.next;
        loadingMore = false
      } 
    }).catch(error=>{ loadingMore=false })
  }

  
</script>

<Navbar />
<div class="container max-w-none">

  {#if user1}


  
  <div class="">
      <br />
  
        
      <button class="btn btn-primary" onclick="my_modal_1.showModal()" for="modal-1">New Project</button>

        <dialog id="my_modal_1" class="modal">
          <form method="dialog" class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            <h4 class="font-bold text-lg">Create New Project</h4>

            <div class="form-group">
            
            <label>Choose programming language:</label>
          
            <select class="select select-sm border" bind:value={language} >
              <option hidden value="" selected></option>
              {#each languages as lang}
              <option value={lang.id}>{lang.prog_lang}</option>
              {/each}
            </select>
            </div>

            <div >
            <input class="mt-4 input input-bordered input-sm w-full" placeholder="Project Name" bind:value={new_project_name} text="Project Name" />
            
            </div>
            {#if (!requesting && language && new_project_name.length>0)}
            <button class="mt-4 btn btn-secondary" on:click={creatProjectRedirect}>Create Project</button>
            {/if}

            {#if requesting}
            <p class="mt-4 ml-2">Creating...</p>
            {/if}
          </form>

          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>

        </dialog>


  {#if loading}
  <p class="pt-10">Loading...</p>
  {/if}

  

  {#if (!loading && projects.results==0)}
      <div>
      <p class="my-4 ">You have not created any project yet.</p>
      <button class="btn btn-primary" onclick="my_modal_1.showModal()" for="modal-1">New Project</button>

      </div>
  {/if}

  {#if (!loading && projects.results!=0)}

  <h4 class="text-xl my-4 ">Your Works</h4>

  <table class="table bg-base-200">
      <thead>
        <tr>
          <th>NAME</th>
          <th>LANGUAGE</th>
          <th>CREATED</th>
          <th>ACTION</th>
        </tr>
      </thead>
  
      <tbody>

      {#each projects as project}
      <tr>
          <td>
          <a class="text-primary font-bold" href={"/write-code-online/"+project.slug}> {project.name} </a> 
          
          </td>
          <td>{project.lang.prog_lang}</td>
          <!-- <td>fd</td> -->
          <td>{new Date(project.created).toLocaleDateString()}</td>
          <td>
            <span class="cursor" on:keydown={()=>{}} on:click={()=>deleteProject(project.id)}>
              <Delete />
              <!-- <svg width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ff2e2e" stroke="#ff2e2e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#ff3700"></path><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#ff3700"></path></g></svg> -->
            </span>
            
            
            </td>
        </tr>
      {/each}
  </tbody>

  </table>
  {/if}
  <br />
  {#if next}
  <div class="row flex-center">
    {#if loadingMore} <p>loading...</p> {/if}
    {#if (!loadingMore && !loading)}<button on:click={loadMore} class="btn btn-secondary">Load More</button>{/if}
  </div>
  {/if}
  <br />

  </div>

{:else}

    <div class="hero min-h-screen">
        <div class="hero-content p-0 pt-10 pb-10 flex-col lg:flex-row-reverse">

            <div class="flex-1">
            <img src="/home.jpg" alt="Coding Chaska Lab" />
            </div>
          <div class="flex-1">
            <h1 class="text-5xl font-bold">Write Code Online</h1>
            <p class="py-6">Write code online without installing anything on your system.</p>

            <a href="/login?nextPage={$page.url.pathname}"><button class="btn btn-primary">Get Started</button></a>


          </div>
        </div>
      </div>

    {/if}

    {#if !user1}
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-xl">
            <br />
            <h1 class="text-5xl font-bold">Coding Problems</h1>
            <p class="py-6">
                Solving coding problems is an essential skill for any programmer.
                It helps to develop logical thinking, creativity, and problem-solving abilities. 
                By solving coding problems regularly, programmers can become more confident and proficient in their chosen programming language and domain.
            </p>
            <a href="/coding-problems"><button class="btn btn-primary">Solve Now</button></a> 
            <br />
            <br />
          </div>
        </div>
    </div>
    {/if}

</div>

<Footer />