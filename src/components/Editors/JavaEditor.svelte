<script>
    // @ts-nocheck
    
        import CodeMirror from "svelte-codemirror-editor";
        import { java } from "@codemirror/lang-java";
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
        lang={java()}
        styles={{
            "&": {
                maxWidth: "100%",
                height:"94vh",
            },
        }}
        theme={theme==="dark"?oneDark:""}
    />