<script lang="ts">
    import { onMount } from 'svelte';

    import PythonEditor from '../../../components/Editors/PythonEditor.svelte';
    import { Pane, Splitpanes } from 'svelte-splitpanes';
    import ThemeChange from '../../../components/ThemeChange.svelte';

    import { writable } from 'svelte/store';

    let value = '';
    let projectcode = {"code": "print('HelloWorld')", "file_name":"main.py"}

    let is_mount = false;

    onMount(() => {
        value = localStorage.getItem('main.py') || projectcode.code;
        is_mount = true;
    });

    $: saveState(value);

    function saveState() {
        if (is_mount) {
            localStorage.setItem('main.py', value);
        }
    }


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


  const logs = writable([{"error":false,"output":"Welcome to python editor!"}]);

  let innerWidth = 0

  $: is_small_screen = innerWidth<640;


</script>

<svelte:window bind:innerWidth />


<svelte:head>
    <title>Python Online Code Editor | Coding Chaska Lab</title>
    <meta name="description" content="Try Coding Chaska Lab's Python Online Code Editor. Write Python code online without needing to log in. Test your code instantly and see the results in real-time." />
    <meta name="keywords" content="Python Online Code Editor, Code Online, Python Programming, Coding Chaska Lab, Write Python Code, Test Python Code" />
    <meta property="og:title" content="Python Online Code Editor | Coding Chaska Lab" />
    <meta property="og:description" content="Write Python code online with Coding Chaska Lab. Test and run your code instantly without logging in." />
    <meta property="og:url" content="https://www.codingchaskalab.com/online-editor/python" />
    <meta property="og:type" content="website" />
    <!-- <meta property="og:image" content="/path/to/your/og-image.jpg" /> -->
    <link rel="canonical" href="https://www.codingchaskalab.com/online-editor/python" />
</svelte:head>

<div on:keydown={handleSave} class="flex flex-col h-screen overflow-hidden">
    <div class="sm:block" style="border-bottom:1.2px solid grey">
        <div class="text-sm flex justify-between breadcrumbs px-2">
            <ul>
                <li>
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <span style="font-size: small;">You are trying our online Python editor</span>
                </li>
            </ul>
            <div class="flex items-center">
                <a href="/login?nextPage=/online-editor/create-project/python"> <span class="my-0 btn btn-sm btn-outline btn-primary mx-4">
                    Save Code
                </span>
                </a>
                <span>
                    <ThemeChange />
                </span>
            </div>
        </div>
    </div>

    <Splitpanes horizontal={is_small_screen}>
        

        <Pane minSize={5} size={60}>

            <PythonEditor bind:value project_type="project" on:functionEvent={handleFunctionEvent} />
            
        </Pane>

        <Pane minSize={20} size={40}>
            
            <div class="overflow-auto bg-base-100 h-full" >
                <div class="bg-base-200 flex items-center justify-between">
                  <span class="btn btn-sm">OUTCOME</span>

                  <button on:click={()=> logs.update(current => [])} class="btn btn-sm btn-primary btn-outline">CLEAR</button>

      
                </div>
                <div class="px-1 py-2 font-mono">
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
</div>
