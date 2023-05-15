<script>
    // @ts-nocheck
    
        import CodeMirror from "svelte-codemirror-editor";
        // impor
        import {html} from "@codemirror/lang-html";
        // import { python } from "@codemirror/lang-python";
            // import {javascript} from "@codemirror/lang-javascript"

        import { oneDark } from "@codemirror/theme-one-dark";
    
        /**
         * @type {any}
         */
         export let value;
         export let theme;
    </script>
    
    <CodeMirror 
        bind:value 
        lang={html()}
        styles={{
            "&": {
                maxWidth: "100%",
                height: "100%",
            },
        }}
        theme={theme==="dark"?oneDark:""}
    />