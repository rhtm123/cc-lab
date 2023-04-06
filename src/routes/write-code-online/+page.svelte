
<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import Navbar from "../../components/Navbar.svelte";
    import { postDataAuth } from "../../utils/auth";

    import user from "../../stores/auth";
    let API_URL = "https://codingchaska.up.railway.app/api/v1/";
    import { goto } from "$app/navigation";
    import LoginRequired from "../../components/LoginRequired.svelte";


    // @ts-ignore
    let user1;
    let projects=[];
    let languages = [];
    let loading = true;
    let loginChecked = false;

    user.subscribe(value => {
        if (value) {user1 = JSON.parse(value);}
        else{user1=null}
        loginChecked = true;
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
          language = data1.results[0].id;
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
      setError({text:"Title name should not be emptied"});
      requesting = false      
    } else {

    postDataAuth(url,user1.access,{name:new_project_name, creator_id:user1.user.id,lang_id:language})
    .then(data2 => {
    //   requesting = false  
        goto("/write-code-online/"+data2.slug)    
        // console.log(data2)
      }).catch(error => {
    })
  }
    } 

    let new_project_name="";
    let language;
    let requesting=false;

</script>

<Navbar />

<div class="container">

    {#if (loginChecked && !user1)}
      <LoginRequired />
    {/if}

    {#if (loginChecked && user1)}
    <div class="section">
        <br />
    
          <div class="">
            <label class="paper-btn" for="modal-1">Start Coding</label>
          </div>
          <input class="modal-state" id="modal-1" type="checkbox">
          <div class="modal">
            <label class="modal-bg" for="modal-1"></label>
            <div class="modal-body">
              <label class="btn-close" for="modal-1">X</label>
              <h4 class="modal-title">Create New Project</h4>

              <div class="form-group">
              
              <label>Choose programming language:</label>
              <br />
              <select bind:value={language} >
                {#each languages as lang}
                <option value={lang.id}>{lang.prog_lang}</option>
                {/each}
              </select>
              </div>

              <div class="form-group">
              <input placeholder="Project Name" bind:value={new_project_name} text="Project Name" />
              </div>
              {#if !requesting}
              <button on:click={creatProjectRedirect}>Start Now</button>
              {/if}

              {#if requesting}
              <p>Creating...</p>
              {/if}

            </div>
          </div>


    {#if loading}
    <p>Loading...</p>
    {/if}

    

    {#if (!loading && projects.results===0)}
        <p>You have not created any project yet.</p>
    
    {/if}

    {#if (!loading && projects.results!=0)}

    <h4>Your Works</h4>

    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Created on</th>
            <th>Action</th>
          </tr>
        </thead>
    
        <tbody>

        {#each projects as project}
		<tr>
            <td>
            <a href={"/write-code-online/"+project.slug}> {project.name} </a> 
            
            </td>
            <td>{project.lang.prog_lang}</td>
            <td>{new Date(project.created).toLocaleDateString()}</td>
            <td>
              <button on:click={()=>deleteProject(project.id)}>delete</button>
              
              
              </td>
          </tr>
	    {/each}
    </tbody>

    </table>
    {/if}
    <br />
    <br />

    </div>
    {/if}
</div>


