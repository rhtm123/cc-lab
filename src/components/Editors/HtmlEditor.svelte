<script>
    // @ts-nocheck
    
        import CodeMirror from "svelte-codemirror-editor";
        // impor
        import {html} from "@codemirror/lang-html";
        // import { python } from "@codemirror/lang-python";
            // import {javascript} from "@codemirror/lang-javascript"

        import { oneDark } from "@codemirror/theme-one-dark";
        import { currentTheme } from "../../stores/theme";
    
        /**
         * @type {any}
         */
         export let value;
         export let theme;
         currentTheme.subscribe(value => {
                theme = value;
        });
    </script>
    
    <CodeMirror 
        bind:value 
        lang={html()}
        styles={{
            "&": {
                maxWidth: "100%",

                height:"94vh",
            },
        }}
        theme={theme==="dark"?oneDark:""}
    />