<script>
    // @ts-nocheck
    
        import CodeMirror from "svelte-codemirror-editor";
        // import { python } from "@codemirror/lang-python";
            import {javascript} from "@codemirror/lang-javascript"

        import { oneDark } from "@codemirror/theme-one-dark";
    
        /**
         * @type {any}
         */
         export let value;
         export let theme;
    </script>
    
    <CodeMirror 
        bind:value 
        lang={javascript()}
        styles={{
            "&": {
                maxWidth: "100%",
                height: "100vh",
            },
        }}
        theme={theme==="dark"?oneDark:""}
    />