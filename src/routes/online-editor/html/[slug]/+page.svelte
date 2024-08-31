<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
//   import CodeEditor from '../../../../components/CodeEditor.svelte'; // Unused import
  import user from '../../../../stores/auth';
  import LoginWrapper from '../../../../components/LoginWrapper.svelte';
  import HtmlEditor from '../../../../components/Editors/HtmlEditor.svelte';
  import CssEditor from '../../../../components/Editors/CSSEditor.svelte';
  import JavaScriptEditor from '../../../../components/Editors/JavaScriptEditor.svelte';
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import { postDataAuth } from '../../../../utils/auth';
  import ThemeChange from '../../../../components/ThemeChange.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  let API_URL = import.meta.env.VITE_API_URL;
  let value = "";
  let projectcode;
  let is_owner = false;
  let user1;
  let theme;
  let projectcodes = [{}, {}, {}];
  let html = "";
  let css = "";
  let js = "";
  let srcDoc;

  onMount(async () => {
      try {
          let url = `${API_URL}editor/projectcodes/?project=${data.id}`;
          let response = await fetch(url);
          if (response.ok) {
              let data1 = await response.json();
              let results = data1['results'];
              for (let pc of results) {
                  if (pc?.lang.prog_lang === "html") {
                      projectcodes[0] = pc;
                      html = pc.code;
                      value = pc.code;
                      projectcode = pc
                  } else if (pc?.lang.prog_lang === "css") {
                      css = pc.code;
                      projectcodes[1] = pc;
                  } else if (pc?.lang.prog_lang === "javascript") {
                      js = pc.code;
                      projectcodes[2] = pc;
                  }
              }
          } else {
              console.error("Something is wrong");
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }
  });

  $: saveState(value);

  function saveState() {
      if (projectcode?.lang.prog_lang === "html") {
          html = value;
      } else if (projectcode?.lang.prog_lang === "javascript") {
          js = value;
      } else if (projectcode?.lang.prog_lang === "css") {
          css = value;
      }

      let htmlString = `
      <html>
          <head>
              <style>${css}</style>
          </head>
          <body>
              ${html}
          </body>
          <script>${js}</`+`script>
      </html>
      `;
      srcDoc = htmlString;
  }

  function handleSave(event) {
      if (event.ctrlKey && event.key === 's') {
          event.preventDefault();
          // Handle the save action here
      }
  }

  user.subscribe((uservalue) => {
      if (uservalue) {
          user1 = JSON.parse(uservalue);
          let creatorID = data.creator.id ? data.creator.id : data.creator;
          is_owner = user1.user.id === creatorID;
      }
  });

  let timeout1;
  let is_mount = false;

  onMount(() => {
      is_mount = true;
  });

  $: saveToDatabase(value);

  function saveToDatabase() {
      clearTimeout(timeout1);
      if (is_mount && value.length > 0) {
          timeout1 = setTimeout(async () => {
              try {
                  let url = `${API_URL}editor/projectcode/${projectcode.id}/`;
                  let creatorID = data.creator.id ? data.creator.id : data.creator;
                  if (user1.user.id === creatorID) {
                      await postDataAuth(url, user1.access, { code: value }, "PATCH");
                      console.log("Saved to database");
                  }
              } catch (error) {
                  console.error("Save error:", error);
              }
          }, 4800);
      }
  }

  function handleTabChange(pc) {
      projectcode = pc;
      if (pc?.lang.prog_lang === "html") {
          value = html;
      } else if (pc?.lang.prog_lang === "javascript") {
          value = js;
      } else if (pc?.lang.prog_lang === "css") {
          value = css;
      }
  }
  let innerWidth = 0

    $: is_small_screen = innerWidth<640;


</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{data.name} | Coding Chaska Lab</title>
  <meta property="description" content={`${data.name} - HTML Online Editor, Write Code Online editor`} />
</svelte:head>

<div on:keydown={handleSave} class="flex flex-col h-screen overflow-hidden">
  <div class="sm:block" style="border-bottom:1.2px solid grey">
      <div class="text-sm flex justify-between breadcrumbs px-2">
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
                  <a href="/online-editor">My Projects</a>
              </li>
              <li>
                  <span style="font-size: small;">{data.name}</span>
                  {#if !is_owner}
                  <span style="font-size: small;"> (*You are not the owner of this project) </span>
                  {/if}
              </li>
          </ul>
          <ul>
              <li>
                  <ThemeChange />
              </li>
          </ul>
      </div>
  </div>

  <LoginWrapper>

      <div class="px-1">
        {#each projectcodes as projectcode_}
            {#if projectcode?.id === projectcode_?.id}
                <button class={"text-success bg-base-200 px-2 py-1 font-semibold cursor-default rounded m-1"}>{projectcode_?.file_name}</button>
            {:else}
                <button on:click={() => handleTabChange(projectcode_)} class={"bg-base-200 px-2 py-1 rounded m-1 "}>{projectcode_?.file_name}</button>
            {/if}
        {/each}
       </div>
      <Splitpanes horizontal={is_small_screen}>

          {#if !is_small_screen}
          <Pane minSize={5} size={15}>
              <div class="bg-base-100 h-full">
                  <div class="px-1">
                      {#each projectcodes as projectcode_}
                          {#if projectcode?.id === projectcode_?.id}
                              <button class={"text-success bg-base-200 font-semibold cursor-default rounded-lg mt-1 w-full"}>{projectcode_?.file_name}</button>
                          {:else}
                              <button on:click={() => handleTabChange(projectcode_)} class={"bg-base-200 rounded-lg mt-1 w-full"}>{projectcode_?.file_name}</button>
                          {/if}
                      {/each}
                  </div>
              </div>
          </Pane> 
          {/if}

          <Pane minSize={5} size={60}>
              {#if projectcode?.lang?.prog_lang === "html"}
                  <HtmlEditor bind:value />
              {:else if projectcode?.lang.prog_lang === "javascript"}
                  <JavaScriptEditor bind:value />
              {:else if projectcode?.lang.prog_lang === "css"}
                  <CssEditor bind:value />
              {/if}
          </Pane>

          <Pane minSize={20} size={40}>
              <iframe
                  allowFullScreen
                  style="background:white;"
                  id="containerFrame"
                  width={"100%"}
                  height={"100%"}
                  srcdoc={srcDoc}
              />
          </Pane>
      </Splitpanes>
  </LoginWrapper>
</div>
