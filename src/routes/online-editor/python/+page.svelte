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


    function handleFunctionEvent(event) {
    let runFunction = event.detail.runFunction;
    runFunction();
  }


  const logs = writable([]);

  const originalConsoleLog = console.log;
    console.log = (...args) => {
        logs.update(currentLogs => [...currentLogs, args.join(' ')]);
        originalConsoleLog.apply(console, args);
    };

</script>

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

    <Splitpanes>
        

        <Pane minSize={5} size={60}>

            <PythonEditor bind:value project_type="project" on:functionEvent={handleFunctionEvent} />
            
        </Pane>

        <Pane minSize={20} size={40}>
            
            <div class="overflow-auto" style="height:90vh">
                <div class="bg-base-200 flex items-center justify-between">
                  <span class="btn btn-sm">OUTCOME</span>
      
                </div>
                  <div class="px-2 py-1 font-mono">
                      <ul>
                          {#each $logs as log}
                              <li class="text-sm">> {log}</li>
                          {/each}
                      </ul>
                  </div>
                </div>
        </Pane>
    </Splitpanes>
</div>
