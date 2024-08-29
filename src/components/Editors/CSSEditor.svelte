<script>
    // @ts-nocheck
    
        import CodeMirror from "svelte-codemirror-editor";
        import { css } from "@codemirror/lang-css";
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
        lang={css()}
        styles={{
            "&": {
                maxWidth: "100%",
                height:"94vh",

                // maxHeight: "100%",
            },
        }}
        theme={theme==="dark"?oneDark:""}
    />