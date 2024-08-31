<script lang="ts">
    import { onMount } from 'svelte';

    import { Pane, Splitpanes } from 'svelte-splitpanes';
    import PythonEditor from '../../../../components/Editors/PythonEditor.svelte';
    import ThemeChange from '../../../../components/ThemeChange.svelte';
    import { writable } from 'svelte/store';
    import user from '../../../../stores/auth';
    import { postDataAuth } from '../../../../utils/auth';
    import LoginWrapper from '../../../../components/LoginWrapper.svelte';

    
    let API_URL = import.meta.env.VITE_API_URL;


    export let data;
    let projectdata = data;


    let value = '';
    let projectcode;

    let user1;
    let is_owner = false;

onMount(() => {
        
  let url = API_URL + "editor/projectcodes/?project=" + projectdata.id;
  fetch(url)
    .then(async (response) => {
      if (response.ok) {
        let data1 = await response.json();
        projectcode = data1["results"][0];
        value = projectcode.code

      } else {
      }
    })
    .catch((error) => {});

    });


    function handleSave(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            console.log('Save action triggered!');
        }
    }


    async function handleFunctionEvent(event) {
        let runFunction = event.detail.runFunction;
        let d = await runFunction();
        // console.log("Hello", d);
        logs.update(current => [...current, d]);
  }

  user.subscribe((uservalue) => {
    if (uservalue) {
      user1 = JSON.parse(uservalue);
      if (data.creator.id) {
        is_owner = user1.user.id === data.creator.id;
      } else {
        is_owner = user1.user.id === data.creator;
      }
    }
  });


  const logs = writable([{"error":false,"output":"Welcome to python editor!"}]);



    
  let timeout1;
  let is_mount = false;

  onMount(() => {
    is_mount = true
  });


  $: saveToDatabase(value);

  function saveToDatabase(...args) {

    clearTimeout(timeout1);
    if (is_mount && value.length > 0) {
      setTimeout(() => {
        try {
          let url = API_URL + `editor/projectcode/${projectcode.id}/`;
          // console.log(data);
          let creatorID = data.creator.id
            ? data.creator.id
            : data.creator;
          if (user1.user.id === creatorID) {
            postDataAuth(url, user1.access, { code: value }, "PATCH")
              .then((data2) => {

              })
              .catch((error) => {
              });
          }
        } catch (e) {}
      }, 4800);
    }
  }

  let innerWidth = 0

  $: is_small_screen = innerWidth<640;


</script>

<svelte:window bind:innerWidth />


<svelte:head>
    <title>HTML Editor | Coding Chaska Lab</title>
    <meta property="description" content="HTML Online Editor, Write Code Online editor" />
</svelte:head>

<div on:keydown={handleSave} class="flex flex-col h-screen overflow-hidden">
    
    <div class="sm:block" style="border-bottom:1.2px solid grey">
        <div class="text-sm flex justify-between breadcrumbs px-2">
          <ul>
            <li>
              <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                Home
              </a>
            </li> 

            <li>
              <a href="/online-editor">
                My Projects
              </a>
            </li> 
             
            <li>
              <span style="font-size: small;"
                >{data.name}</span
              >
              {#if !is_owner}
              <span style="font-size: small;"
                > (*You are not the owner of this project) </span
              >
            {/if}
            </li>
          </ul>
    
          <ul>
            <li>
              <ThemeChange />
            </li>
          </ul>
        </div>
    
    </div>

    <LoginWrapper>

    <Splitpanes horizontal={is_small_screen}>
        

        <Pane minSize={5} size={60}>

            <PythonEditor bind:value project_type="project" on:functionEvent={handleFunctionEvent} />
            
        </Pane>

        <Pane minSize={20} size={40}>
            
            <div class="overflow-auto bg-base-100 h-full">
                <div class="bg-base-200 flex items-center justify-between">

                  <span class="btn btn-sm">OUTCOME</span>

                  <button on:click={()=> logs.update(current => [])} class="btn btn-sm btn-primary btn-outline">CLEAR</button>
      
                </div>
                  <div class="px-2 py-1 font-mono">
                    {#each $logs as log}
                    {#if !log.error}
                    <pre class="text-sm text-success">> {log.output}</pre>
                    {:else}
                    <pre class="text-sm text-error">> {log.output}</pre>
                    {/if}
                {/each}
                  </div>
                </div>
        </Pane>
    </Splitpanes>

    </LoginWrapper>
</div>
