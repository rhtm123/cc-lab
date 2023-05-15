<script>
// @ts-nocheck

    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { oneDark } from "@codemirror/theme-one-dark";

    /**
     * @type {any}
     */
     export let value;
     export let theme;
</script>

<CodeMirror 
    bind:value 
    lang={python()}
    styles={{
        "&": {
            maxWidth: "100%",
            height: "90vh",
        },
    }}
    theme={theme==="dark"?oneDark:""}
/>