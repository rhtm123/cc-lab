<script>
    // @ts-nocheck
    
        import CodeMirror from "svelte-codemirror-editor";
        import { oneDark } from "@codemirror/theme-one-dark";
    
        /**
         * @type {any}
         */
         export let value;
         export let theme;
    </script>
    
    <CodeMirror 
        bind:value 
        styles={{
            "&": {
                maxWidth: "100%",
                height: "90vh",

                // height: "100%",
            },
        }}
        theme={theme==="dark"?oneDark:""}
    />