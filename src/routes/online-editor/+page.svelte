<script>
    // @ts-nocheck
    
    
    import Navbar from "../../components/Navbar.svelte";
      import Footer from "../../components/Footer.svelte";
      import { onMount } from "svelte";
    
      import { goto } from "$app/navigation";
    
      import user from "../../stores/auth";
    
      import Delete from "../../components/svg/Delete.svelte";
      let API_URL = import.meta.env.VITE_API_URL;
    
    
      import { postDataAuth } from "../../utils/auth";
        // @ts-ignore
      import CodingProblemLists from "../../components/CodingProblemLists.svelte";
      import LoginWrapper from "../../components/LoginWrapper.svelte";
    
      // @ts-ignore
      let user1;
    
      // @ts-ignore
      let languages =[];
      let language = "";
    
      // @ts-ignore
      let loading;
      // @ts-ignore
      let projects = [];
      // @ts-ignore
      let loadingMore;
      // @ts-ignore
      let next;
    
    
      let new_project_name="";
      let requesting=false;
    
      let ordering = "-updated";
      let selected_language = "";
      // @ts-ignore
      let error;
      // get all languages
    
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
        // @ts-ignore
        }).catch(error=>{  }) 
      });
    
    
      user.subscribe(value => {
          if (value) {user1 = JSON.parse(value);}
          else{user1=null}
      });
    
    
      const getProjects = () => {
      loading = true;
      // @ts-ignore
      if (user1){
      projects = [];
        let url = API_URL + `editor/projects/?type=project&creator=${user1.user.id}&lang=${selected_language}&ordering=${ordering}`;
        fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            loading = false;
            projects = data1.results;
            next = data1.next;
          } 
        // @ts-ignore
        }).catch(error=>{ loading=false })
      } else {
        loading = false;
      }
      }
    
      const changeOrder = (/** @type {{ target: { value: any; }; }} */ e) => {
        ordering = e.target.value;
        getProjects();
      }
    
      // @ts-ignore
      const changeLanguage = (/** @type {{ target: { value: any; }; }} */ e) => {
        selected_language = e.target.value;
        getProjects();
      }
    
    
    
      let codingproblems;
      let codingLoading = true;
    
      const getCodingProblems = () => {
        
        let url = API_URL+"editor/codingproblems/?is_published=true&level=&ordering=updated";
        
          fetch(url)
          .then(async (response) => {
            if (response.ok) {
              let data1 = await response.json();
              codingLoading = false;
              codingproblems = data1;
              // next = data1.next;
            } 
          // @ts-ignore
          }).catch(error=>{ loading=false })
        } 
    
       
    
      onMount(async () => {
        getProjects();
        getCodingProblems();
      });
    
    
      // @ts-ignore
      const deleteProject = (id) => {
        loading = true;
        let url = API_URL + `editor/project/delete/${id}/`;
        // @ts-ignore
        postDataAuth(url,user1.access,{},'DELETE')
        // @ts-ignore
        .then(data2 => {
          getProjects();
          // @ts-ignore
          }).catch(error => {
        })
      }
    
      // @ts-ignore
      function handleKeyPress(event) {
        if (event.key === 'Enter') {
          console.log('Enter key pressed!');
          creatProjectRedirect();
          // Handle the "Enter" key press here
          
          // You can perform any action or call a function here
        }
      }
    
      const creatProjectRedirect = () => {
        requesting = true
        let url = API_URL+ "editor/projects/";
    
        if (!language){
          error = {text:"Please select a language"};
          requesting = false;
          // return;
        }

    
        else if (new_project_name===""){
          error = {text:"Title name should not be emptied"}
          requesting = false;
          // return;
        } 
        else if ( /^\d+$/.test(new_project_name)) {
          error = {text:"Title should not contain number(s) only"}
          requesting = false;
        } 
         
        else {
    
        // @ts-ignore
        postDataAuth(url,user1.access,{name:new_project_name, creator_id:user1.user.id,lang_id:language})
        .then(data2 => {
        //   requesting = false  
            // @ts-ignore
            goto("/online-editor/"+ data2.lang.prog_lang +"/"+data2.slug)    
            console.log(data2)
          }).catch(error => {
            console.log(error)
        })
        }
      } 
    
    
      const loadMore = () => {
        loadingMore = true
        // console.log(next);
        // @ts-ignore
        fetch(next)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            // @ts-ignore
            projects =[...projects, ...data1.results];
            next = data1.next;
            loadingMore = false
          } 
        // @ts-ignore
        }).catch(error=>{ loadingMore=false })
      }
    
    
    const closeError = () => {
      error = {}
    }
    
    </script>
    
    <svelte:head>
      <title>Write Code Online | Coding Chaska Lab </title>
      <meta property="description" content={`Online Python Editor, Online HTML Editor, Online Nodejs Editor, Online Java Editor`} />
    </svelte:head>
    
    <Navbar />
    
    <LoginWrapper>
    
      <div class="p-4 md:w-5/6 lg:w-4/6 mx-auto min-h-screen">
    
              {#if error?.text}
              <div role="alert" class="alert alert-warning my-4">
                <svg on:click={closeError} xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error?.text}</span>
              </div>
              {/if}
    
              <div class="flex justify-between items-center">
    
              <h4 class="text-xl my-2 font-semibold	">My Projects</h4>
    
              <button class="btn btn-primary btn-sm" onclick="my_modal_1.showModal()" for="modal-1">
                + New Project
              </button>
    
    
              </div>
    
    
    
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
                  <input class="mt-4 input input-bordered input-sm w-full" placeholder="Project Name" bind:value={new_project_name} on:keydown={handleKeyPress} text="Project Name" />
                  
                  </div>
                  {#if (!requesting && language && new_project_name.length>0)}
                  <button class="mt-4 btn btn-secondary" on:click={creatProjectRedirect} >Create Project</button>
                  {/if}
    
                  {#if requesting}
                  <p class="mt-4 ml-2">Creating...</p>
                  {/if}
                </form>
    
                <form method="dialog" class="modal-backdrop">
                  <button>close</button>
                </form>
    
              </dialog>
    
              
              <!-- <div class="grid gap-2 grid-cols-1 md:grid-cols-2"> -->
                
    
                <div class="">
    
                
    
    
                  <div class="py-2">
                    <label >
                      <span class="label-text">Ordering: </span>
                    </label>
                    <select class="select select-sm select-bordered" on:change={e => changeOrder(e)} >
                            <option value="updated">Old First</option>
                            <option value="-updated" selected>New First</option>
                    </select>
    
                    <label >
                      <span class="label-text">Language: </span>
                    </label>
                    <select class="select select-sm select-bordered" on:change={e => changeLanguage(e)}>
                      <option value="">All</option>
                      {#each languages as lang}
                      <option value={lang.id}>{lang.prog_lang}</option>
                      {/each}
                      
                  </select>
    
                  </div>
    
              
    
              <div class="card rounded-lg bg-base-200 mt-2 pt-2">
    
                    
                  {#if loading}
                    <p class="p-4">Loading...</p>
                  {/if}
     
    
              {#if (!loading && projects.length>0)}
    
              <table class="table">
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
                      <a class="text-primary font-bold" href={"/online-editor/"+ project.lang.prog_lang + "/" +project.slug}> {project.name} </a>
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
    
              {#if next}
              <div class="row flex-center py-4">
                {#if loadingMore} <p>loading...</p> {/if}
                {#if (!loadingMore && !loading)}<button on:click={loadMore} class="btn btn-sm mx-2">Load More</button>{/if}
              </div>
              {/if}
    
    
              {#if (!loading && projects.length==0)}
                <div>
                <p class="my-4 ">You have not created any project yet.</p>
    
                </div>
              {/if}
    
    
                </div>
    
                </div>
    
    
    
    
    
              <!-- </div> -->
    
    
    
      </div>  
    
    
    </LoginWrapper>
    
    <Footer />
    