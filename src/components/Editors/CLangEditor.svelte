<script>
    // @ts-nocheck

    import CodeMirror from "svelte-codemirror-editor";
    import { cpp } from "@codemirror/lang-cpp";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { currentTheme } from "../../stores/theme";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let value;
    export let theme;

    currentTheme.subscribe(value => {
        theme = value;
    });

    export let height = "88vh";
    let emscriptenLoaded = false;

    // Initialize Module object
    let Module = {
        onRuntimeInitialized: function() {
            console.log("Emscripten runtime initialized");
            emscriptenLoaded = true;
        }
    };

    async function loadEmscripten() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/emscripten@0.0.2-beta/+esm';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Emscripten"));
            document.head.appendChild(script);
        });
    }

    onMount(async () => {
        try {
            await loadEmscripten();
            console.log("Emscripten loaded!");
        } catch (e) {
            console.error("Error loading Emscripten:", e);
        }
    });

    async function runCode() {
        dispatch('functionEvent', {
            runFunction: async () => {
                if (emscriptenLoaded) {
                    try {
                        const code = value;  // Get code from the editor

                        // Assuming the main function takes no arguments and returns an int
                        const result = Module.ccall('main', 'number', [], []);

                        console.log('Result from main function:', result);

                    } catch (e) {
                        console.error('Error running C/C++ code:', e);
                    }
                } else {
                    console.error("Emscripten not yet loaded or initialized.");
                }
            },
        });
    }
</script>

<div class="bg-base-200 flex items-center justify-between">
    <span class="px-2 opacity-90 text-sm">C/C++</span>
    <div>
        {#if emscriptenLoaded}
            <button on:click={runCode} class="btn btn-sm btn-primary">RUN CODE</button>
        {:else}
            <p>emscripten loading...</p>
        {/if}
    </div>
</div>

<CodeMirror 
    bind:value 
    lang={cpp()}
    styles={{
        "&": {
            maxWidth: "100%",
            height: height,
        },
    }}
    theme={theme === "dark" ? oneDark : ""}
 />
