<script lang="ts">
    import { onMount } from 'svelte';
    import HtmlEditor from '../../../components/Editors/HtmlEditor.svelte';
    import CssEditor from '../../../components/Editors/CSSEditor.svelte';
    import JavaScriptEditor from '../../../components/Editors/JavaScriptEditor.svelte';
    import { Pane, Splitpanes } from 'svelte-splitpanes';
    import ThemeChange from '../../../components/ThemeChange.svelte';

    let value = '';
    let projectcode;
    let projectcodes = [
        { code: '<h1>Hello World</h1>', file_name: 'index.html' },
        { code: 'h1{color:blue}', file_name: 'style.css' },
        { code: '', file_name: 'script.js' }
    ];
    
    let html = '';
    let css = '';
    let js = '';
    let srcDoc = '';

    onMount(() => {
        html = localStorage.getItem('index.html') || projectcodes[0].code;
        css = localStorage.getItem('style.css') || projectcodes[1].code;
        js = localStorage.getItem('script.js') || projectcodes[2].code;
        projectcode = projectcodes[0]; // Set the initial projectcode
        value = html;
        updateSrcDoc();
    });

    $: saveState(value);

    function saveState() {
        if (projectcode?.file_name === 'index.html') {
            html = value;
            localStorage.setItem('index.html', value);
        } else if (projectcode?.file_name === 'script.js') {
            js = value;
            localStorage.setItem('script.js', value);
        } else if (projectcode?.file_name === 'style.css') {
            css = value;
            localStorage.setItem('style.css', value);
        }
        updateSrcDoc();
    }

    function updateSrcDoc() {
        srcDoc = `
            <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>${html}</body>
                <script>${js}</`+`script>
            </html>
        `;
    }

    function handleSave(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            console.log('Save action triggered!');
        }
    }

    function handleTabChange(projectcode_) {
        if (projectcode === projectcode_) return; // Avoid unnecessary updates
        projectcode = projectcode_;
        if (projectcode?.file_name === 'index.html') {
            value = html;
        } else if (projectcode?.file_name === 'script.js') {
            value = js;
        } else if (projectcode?.file_name === 'style.css') {
            value = css;
        }
    }

</script>

<svelte:head>
    <title>HTML, CSS & JavaScript Online Code Editor | Coding Chaska Lab</title>
    <meta name="description" content="Try Coding Chaska Lab's HTML, CSS, and JavaScript Online Code Editor. Write, test, and preview your web code instantly, all in one place, without needing to log in." />
    <meta name="keywords" content="HTML editor, CSS editor, JavaScript editor, online code editor, web development, Coding Chaska Lab, write code online, code preview" />
    
    <!-- Open Graph Meta Tags for Social Sharing -->
    <meta property="og:title" content="HTML, CSS & JavaScript Online Code Editor | Coding Chaska Lab" />
    <meta property="og:description" content="Write and preview your HTML, CSS, and JavaScript code instantly with Coding Chaska Lab's online editor. Perfect for web developers and learners." />
    <meta property="og:url" content="https://www.codingchaskalab.com/online-editor/html" />
    <meta property="og:type" content="website" />
    <!-- <meta property="og:image" content="/path/to/your/og-image.jpg" /> -->
    <link rel="canonical" href="https://www.codingchaskalab.com/online-editor/html" />

</svelte:head>

<div on:keydown={handleSave} class="flex flex-col h-screen overflow-hidden">
    <div class="sm:block" style="border-bottom:1.2px solid grey">
        <div class="text-sm flex justify-between breadcrumbs py-1 px-2">
            <ul>
                <li>
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <span style="font-size: small;">You are trying our online HTML editor</span>
                </li>
            </ul>
            <div class="flex items-center">
                <a href="/login?nextPage=/online-editor/create-project/html"> <span class="my-0 btn btn-sm btn-outline btn-primary mx-4">
                    Save Code
                </span>
                </a>
                <span>
                    <ThemeChange />
                </span>
            </div>
        </div>
    </div>

    <Splitpanes>
        <Pane minSize={5} size={15}>
            <div class="bg-base-100 h-full">
                {#each projectcodes as projectcode_}
                    {#if projectcode?.file_name === projectcode_?.file_name}
                        <button class="text-success bg-base-200 font-semibold cursor-default rounded-lg mt-1 w-full">{projectcode_?.file_name}</button>
                    {:else}
                        <button on:click={() => handleTabChange(projectcode_)} class="bg-base-200 rounded-lg mt-1 w-full">{projectcode_?.file_name}</button>
                    {/if}
                {/each}
            </div>
        </Pane>

        <Pane minSize={5} size={60}>
            {#if projectcode?.file_name === 'index.html'}
                <HtmlEditor bind:value />
            {:else if projectcode?.file_name === 'script.js'}
                <JavaScriptEditor bind:value />
            {:else if projectcode?.file_name === 'style.css'}
                <CssEditor bind:value />
            {/if}
        </Pane>

        <Pane minSize={20} size={40}>
            <iframe
                allowFullScreen
                style="background:white;"
                id="containerFrame"
                width="100%"
                height="100%"
                srcdoc={srcDoc}
            />
        </Pane>
    </Splitpanes>
</div>
