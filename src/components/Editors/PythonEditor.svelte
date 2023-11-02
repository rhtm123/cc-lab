<script>
// @ts-nocheck

    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { currentTheme } from "../../stores/theme";

    /**
     * @type {any}
     */
     export let value;
     export let theme;

     export let height = "94vh";

     currentTheme.subscribe(value => {
                theme = value;   
    });
</script>

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