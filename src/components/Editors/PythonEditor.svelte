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

     export let project_type;


     let height = project_type==="problem"?"90%":"88vh";

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
            // console.log("Input Set as prompt")
        } catch (e) {
            console.error("Error loading Pyodide:", e);
        }
    });


    


    async function runTestCase() {
    dispatch('functionTestEvent', {
        runFunction: async (inputs, assertCode) => {
            if (pyodideLoaded) {
                const code = value;
                let d = { error: false };
                let inputLines = inputs.split("\n").map(input => input.trim());
                let i = 0;
                let l = inputLines.length;

                function customInput(prompt = "") {
                    console.log("input is called", inputLines[i])
                    if (i < l) {
                        const val = inputLines[i];
                        i += 1;
                        return val;
                    } else {
                        throw new Error("InputsNotProvidedError: input value(s) may not be provided");
                    }
                }

                // Expose the customInput function to the Python environment
                pyodide.globals.set("customInput", customInput);

                // Redirect stdout and define the input function in Python
                await pyodide.runPythonAsync(`
                    import sys
                    from io import StringIO

                    class InputsNotProvidedError(Exception):
                        pass

                    # Redirect stdout
                    sys.stdout = mystdout = StringIO()

                    def input(prompt=""):
                        return customInput()
                `);

                try {
                    await pyodide.runPythonAsync(code);
                } catch (err) {
                    let errorClass = err.constructor.name;
                    let detail = err.message.split("<module>").at(-1);

                    d = { error: true, errorText: `${errorClass}: ${detail}` };
                }

                if (!d['error'] && assertCode){
                    try {
                        await pyodide.runPythonAsync(assertCode);
                    } catch (err) {
                        let errorClass = err.constructor.name;
                        let detail = err.message.split("<module>").at(-1);
                        d = { error: true, errorText: `${errorClass}: ${detail}` };
                    }
                }

                const output = await pyodide.runPythonAsync('mystdout.getvalue()');
                if (d.error) {
                    d['output'] = ""
                    return d
                    // outputElement.textContent = d.errorText;
                } else {
                    d['output'] = output
                    return d;
                }
            }
        },
    });
}

async function runCode() {
    dispatch('functionEvent', {
        runFunction: async () => {
            if (pyodideLoaded) {
                await interactive_input_set();

                let d = {"error": false, "output": ""};

                // Redirect stdout to capture Python's print statements
                await pyodide.runPythonAsync(`
                    import sys
                    from io import StringIO
                    sys.stdout = mystdout = StringIO()
                `);

                try {
                    // Run the user's code
                    await pyodide.runPythonAsync(value);

                    // Capture the output
                    const output = await pyodide.runPythonAsync('mystdout.getvalue()');
                    // console.log(output);
                    console.log(JSON.stringify(output));
                    // Directly append \n to ensure separation of print statements
                    d['output'] = output;

                } catch (e) {
                    d['error'] = true;
                    d['output'] = `${e.message}\n`;
                }

                return d;
            }
        },
    });
}



     currentTheme.subscribe(value => {
                theme = value;   
    });
    
</script>

    <div class="bg-base-200 flex items-center justify-between">
    <span class="px-2 opacity-90 text-sm">PYTHON</span>

    <div>


        
    {#if pyodideLoaded}
        {#if project_type =="problem"}
            <button on:click={runTestCase} class="btn btn-sm btn-primary">RUN TEST CASES</button>
        {/if}
        <button on:click={runCode} class="btn btn-sm btn-primary">RUN CODE</button>
    {:else}
        <p>Loading Pyodide...</p>
    {/if}

    </div>



    </div>

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