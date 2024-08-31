<script>
    import user from "../../../../stores/auth";
    import { postDataAuth } from "../../../../utils/auth";

    import { goto } from '$app/navigation';


    // @ts-ignore
    let user1;

    // @ts-ignore
    let error;
    // @ts-ignore
    let requesting;

    let API_URL = import.meta.env.VITE_API_URL;

    import { page } from '$app/stores';


    let slug = $page.params.slug;




    user.subscribe(value => {
          if (value) {user1 = JSON.parse(value);}
          else{user1=null}
    });

    let projectname = ""

    let langs = {
        "html": 7,
        "python":1
    }

    // @ts-ignore
    let projectdata;


    const creatProjectRedirect = () => {
        requesting = true
        console.log("fdfdfkdjfdkfd");
        let url = API_URL+ "editor/projects/";


    
        if (projectname===""){
          error = {text:"Title name should not be emptied"}
          requesting = false;
          // return;
        } 
        else if ( /^\d+$/.test(projectname)) {
          error = {text:"Title should not contain number(s) only"}
          requesting = false;
        } 
         
        else {
            requesting = true;
    
        // @ts-ignore
        postDataAuth(url,user1.access,{name:projectname, creator_id:user1.user.id,lang_id:langs[slug]})
        // @ts-ignore
        .then(data2 => {
        //   
            // @ts-ignore
            let url2 = API_URL + "editor/projectcodes/?project="+data2.id;
            projectdata = data2;

            getAllProjectCodes(url2);

          }).catch(error => {
            console.log(error)
        })
        }
      } 

    const closeError = () => {
      error = {}
    }

    // @ts-ignore
    // @ts-ignore
 
    async function getAllProjectCodes(url) {
    console.log("Getting All Projectcodes");

    try {
        let response = await fetch(url);
        if (response.ok) {
            let data1 = await response.json();
            let results = data1['results'];
            console.log("ALL RESULTS: ", results);

            // Create an array of promises from saveToDatabase
            let savePromises = results.map(projectcode => saveToDatabase(projectcode));

            // Wait for all promises to resolve
            await Promise.all(savePromises);


            // Navigate after all saveToDatabase calls have completed
            goto(`/online-editor/${slug}/${projectdata.slug}`);

        } else {
            console.log("Something is wrong");
        }
    } catch (error) {
        console.log(error);
    }
}



    // @ts-ignore
    function saveToDatabase(projectcode) {
        console.log(projectcode.file_name, "Saving to database")
        try {
          // @ts-ignore
          let url = API_URL + `editor/projectcode/${projectcode.id}/`;

            let value = localStorage.getItem(projectcode.file_name);
            console.log(value);

            if (value){
          
            // @ts-ignore
            postDataAuth(url, user1.access, { code: value }, "PATCH")
              // @ts-ignore
              // @ts-ignore
              // @ts-ignore
              .then((data2) => {
                // console.log(data2);
                console.log("saved to database")
              })
              // @ts-ignore
              .catch((error) => {
                console.log(error, "error");
              });
            }
        } catch (e) {
            console.log(e, "error");
        }
    }


</script>

<div class="p-4 md:p-4 md:w-1/2 md:m-auto">

    {#if !requesting }

    {#if error?.text}
              <div role="alert" class="alert alert-warning my-4">
                <svg on:click={closeError} xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error?.text}</span>
              </div>
    {/if}

    
    <input class="mt-4 input input-bordered input-sm w-full" placeholder="Project Name" bind:value={projectname}  text="Project Name" />

    <button class="mt-4 btn btn-sm btn-secondary" on:click={creatProjectRedirect} >Create Project</button>
    <p class="text-sm mt-4 opacity-80">Don't want to create project? Return back to <a href="/" class="text-primary"> home</a></p>

    {:else}
        <p>Please wait. Your project will be created soon.</p>
    {/if}

</div>



