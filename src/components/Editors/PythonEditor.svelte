<script>
// @ts-nocheck

    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { currentTheme } from "../../stores/theme";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';



    /**
     * @type {any}
     */
     export let value;
     export let theme;

     export let height = "88vh";
     export let project_type;

     let pyodide;
     let pyodideLoaded = false;

     const dispatch = createEventDispatcher();

     async function loadPyodide() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Pyodide"));
            document.head.appendChild(script);
        });
    }

    


function interactive_input(prompt) {
        let userInput = window.prompt(prompt);
        console.log(`${prompt} ${userInput}`);
        return(userInput);
}

async function interactive_input_set() {
    // Properly expose the interactive_input function to Pyodide
    pyodide.globals.set("interactive_input", interactive_input);
    pyodide.globals.set("square", x => x*x);

    await pyodide.runPythonAsync(`
        import builtins
        def input(prompt=''):
            return interactive_input(prompt)
        builtins.input = input
    `);
}


    onMount(async () => {
        try {
            await loadPyodide();
            pyodide = await globalThis.loadPyodide();
            pyodideLoaded = true;
            console.log("Pyodide loaded!");
            await interactive_input_set();
            // console.log("Input Set as prompt")

        } catch (e) {
            console.error("Error loading Pyodide:", e);
        }
    });


    async function runCode() {
    dispatch('functionEvent', {
      runFunction: async () => {
        // console.log('This is a function from Child!');
        if (pyodideLoaded) {
           try {
                await pyodide.runPythonAsync(value);
                // console.log("Output: " + output);
           } catch (e) {
               let output = `Error: ${e.message}\n`;
               console.log(output);
             }
        }

      },
    });
    }
     currentTheme.subscribe(value => {
                theme = value;   
    });
    
</script>


{#if !pyodideLoaded}
    <p>Loading Pyodide...</p>
{:else}
{#if project_type === "project"}
<div class="bg-base-200 flex items-center justify-between">
<span class="px-2 opacity-90 font-bold">PYTHON</span>
<button on:click={runCode} class="btn btn-sm btn-primary">RUN CODE</button>
</div>
{/if}

<CodeMirror 
    bind:value 
    lang={python()}
    styles={{
        "&": {
            maxWidth: "100%",
            height: height,
        },
    }}
    theme={theme==="dark"?oneDark:""}
/>

{/if}