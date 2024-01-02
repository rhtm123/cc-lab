<script>
  // @ts-nocheck

  import { Pane, Splitpanes } from "svelte-splitpanes";

  import { onMount, onDestroy } from "svelte";
  import { postDataAuth } from "../utils/auth";
  import user from "../stores/auth";
  import PythonEditor from "./Editors/PythonEditor.svelte";
  import JavaScriptEditor from "./Editors/JavaScriptEditor.svelte";
  import FileExplorer from "./FileExplorer.svelte";
  import SimpleEditor from "./Editors/SimpleEditor.svelte";
  import HtmlEditor from "./Editors/HtmlEditor.svelte";

  import { activeFile } from "../stores/activeFile";
  import CssEditor from "./Editors/CSSEditor.svelte";
    import CLangEditor from "./Editors/CLangEditor.svelte";
    import JavaEditor from "./Editors/JavaEditor.svelte";
  import ThemeChange from "./ThemeChange.svelte";
    import Terminal from "./Terminal.svelte";

  /**
   * @type {{ container_name: any; }}
   */

  export let projectdata;
  //  console.log(projectdata);

  let container_name;

  let value = "";
  let socket;
  let is_mount = false;
  let projectcode;
  let API_URL = import.meta.env.VITE_API_URL;

  let is_owner = false;
  let user1;
  let theme;
  let explorer;

  $: onMount(() => {
    theme = localStorage.getItem("theme") || "light";
    // console.log("This is called");
  });

  user.subscribe((value) => {
    if (value) {
      user1 = JSON.parse(value);
      if (projectdata.creator.id) {
        is_owner = user1.user.id === projectdata.creator.id;
      } else {
        is_owner = user1.user.id === projectdata.creator;
      }
    }
  });


  // saving to Container if value is changed
  $: saveToContainer(value);

  function saveToContainer(...args) {
    if (is_mount && socket) {
      // console.log("Saving to container")
      // console.log(value);
      setTimeout(() => {
        // console.log(projectcode);
        // console.log()
        try {
          socket.send(
            JSON.stringify({
              task: "save_code",
              code: value,
              container_name: container_name,
              file_name: projectcode?.file_location,
            })
          );
          localStorage.setItem(projectcode.file_location, value);
          // console.log(projectcode.file_location, value);
        } catch (e) {}
      }, 10);
    }
  }



  // saving to database if typing is stopped for few seconds; 
  $: saveToDatabase(value);

  let timeout1;

  function saveToDatabase(...args) {
    clearTimeout(timeout1);
    // console.log("onchange is called");
    if (is_mount && socket) {
      // console.log("stored to database");
      setTimeout(() => {
        try {
          let url = API_URL + `editor/projectcode/${projectcode.id}/`;
          // console.log(projectdata);
          let creatorID = projectdata.creator.id
            ? projectdata.creator.id
            : projectdata.creator;
          if (user1.user.id === creatorID) {
            postDataAuth(url, user1.access, { code: value }, "PATCH")
              .then((data2) => {
                // console.log("saved")
              })
              .catch((error) => {
                console.log(error, "error");
              });
          }
        } catch (e) {}
      }, 2400);
    }
  }

  // storing to database if keypad

  // activeFile will change the projectcode
  activeFile.subscribe((value1) => {
    value = value1?.code;
    projectcode = value1;
    // console.log(projectcode);
  });

  let url = API_URL + "editor/projectcodes/?project=" + projectdata.id;
  fetch(url)
    .then(async (response) => {
      if (response.ok) {
        let data1 = await response.json();
        projectcode = data1["results"][0];
        projectcode["file_location"] = "/src/" + projectcode.file_name;
        // console.log(projectcode);
        activeFile.update(() => projectcode);
        explorer = { is_folder: true, file_name: "src", files: data1.results };
        // console.log(explorer);
      } else {
      }
    })
    .catch((error) => {});

    const connectSocket = () => {
    console.log("connect socket called again");
    let url = import.meta.env.VITE_HANDLER_WS;
    socket = new WebSocket(url);
  };

  const onSocketOpen = () => {
    console.log("socket open now");
    socket.send(
      JSON.stringify({
        task: "create_container",
        container_name: projectdata.container_name,
        image_name: projectdata.lang.docker_image_name || "python-image",
      })
    );
  };

  const onSocketMessage = (e) => {
    let msg_data = JSON.parse(e.data);
    if (msg_data["message"] === "container_created") {
      setTimeout(() => {
        container_name = projectdata.container_name;
      }, 1000);
    } else {
      // console.log(msg_data)
    }
  };

  const onSocketClose = () => {
    // Wait for a short delay before reconnecting
    setTimeout(() => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        connectSocket();
      }
    }, 1000); // You can adjust the delay (in milliseconds) as needed
  };

  onMount(() => {
    connectSocket();

    is_mount = true
    socket.onopen = onSocketOpen;
    socket.onmessage = onSocketMessage;
    socket.onclose = onSocketClose;

    return () => {
      // Clean up resources when the component is about to be removed
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  });

  onDestroy(() => {
    // Clean up resources when the component is about to be removed
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  });



  // onMount(async () => {
  //   connectSocket();

  //   let image_name = projectdata.lang.docker_image_name;
  //   // console.log(image_name);

  //   socket.onopen = () => {
  //     console.log("socket open now");
  //     socket.send(
  //       JSON.stringify({
  //         task: "create_container",
  //         container_name: projectdata.container_name,
  //         image_name: image_name ? image_name : "python-image",
  //       })
  //     );
  //   };

  //   socket.onmessage = function (e) {
  //     let msg_data = JSON.parse(e.data);
  //     if (msg_data["message"] === "container_created") {
  //       // console.log("Got the creation")
  //       setTimeout(() => {
  //         container_name = projectdata.container_name;
  //       }, 1000);
  //     } else {
  //       // console.log(msg_data)
  //     }
  //   };

  //   socket.onclose = function () {
  //     connectSocket();
  //   }
  //   is_mount = true;
  // });

  let iframeURL;

  function refreshIframe() {
    refreshIframe_();
  }

  const refreshIframe_ = function () {
    console.log("Refreshing iframe");
    if (projectdata.lang == 1) {
        iframeURL =
          "https://" + container_name + ".thelearningsetu.com/python/";
      } else if (projectdata.lang?.prog_lang == "html") {
        iframeURL = "https://" + container_name + ".thelearningsetu.com/";
      } else {
        iframeURL =
          "https://" +
          container_name +
          ".thelearningsetu.com/" +
          projectdata.lang.prog_lang +
          "/";
      }
      const iframe = document.getElementById("containerFrame");
      iframe.src = iframeURL;
  }


  $: onChange(value);

  let timeout;
  function onChange(...args) {
     clearTimeout(timeout);
     console.log("onchange is called");
     if (projectdata.lang?.prog_lang == "html" ) {
         timeout = setTimeout(() => {
           refreshIframe_();
         }, 1000);
       }
   }

  // let interval; 
  onMount(() => {
    setTimeout(() => {
      refreshIframe_();
    }, 1500);
    
  });

  onDestroy(() => {
    if (projectdata.lang?.prog_lang == "html") { 
      clearTimeout(timeout);
    }
    clearTimeout(timeout1);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  });


  function handleSave(event) {
    if (event.ctrlKey && event.key ==='s') {
      // Handle the save action here
      // console.log('Save action triggered!');
      event.preventDefault(); // Prevent the default browser save action
    }
  }


</script>

<div on:keydown={handleSave} class="flex flex-col h-screen  overflow-hidden">
  <div class="sm:block" style="border-bottom:1.2px solid grey">
    {#if projectdata.type==="project"}
    <div class="text-sm flex justify-between breadcrumbs px-2">
      <ul>
        <li>
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            Home
          </a>
        </li> 
         
        <li>
          <span style="font-size: small;"
            >{projectdata.name}</span
          >
          {#if !is_owner}
          <span style="font-size: small;"
            > (*You are not the owner of this project) </span
          >
        {/if}
        </li>
      </ul>

      <ul>
        <li>
          <ThemeChange />
        </li>
      </ul>
    </div>
    {/if}
  </div>
    
    <Splitpanes class="h-full">
      <Pane minSize={10} size={15}>
        {#if explorer}
        <ul class="menu bg-base-200 w-full h-full">
          <FileExplorer {container_name} {socket} {explorer} folder_name={"/"} />
        </ul>
        {/if}
      </Pane>
  
      <Pane minSize={20} size={60} style="height:100%" >
        {#if projectdata.lang?.prog_lang === "python" || projectdata.lang === 1}
          <PythonEditor bind:value {theme} />
        {:else if projectcode?.lang?.prog_lang === "javascript" || projectdata.lang?.prog_lang === "nodejs"}
          <!-- <h1>JS</h1> -->
          <JavaScriptEditor bind:value {theme} />
        {:else if projectcode?.lang.prog_lang === "html"}
          <!-- <h1>HTML</h1> -->
          <HtmlEditor bind:value {theme} />
        {:else if projectcode?.lang.prog_lang === "css"}
          <!-- <h1>CSS</h1> -->
          <CssEditor bind:value {theme} />

        {:else if projectcode?.lang.prog_lang === "c-language"}
          <!-- <h1>CSS</h1> -->
          <CLangEditor bind:value {theme} />

        {:else if projectcode?.lang.prog_lang === "java"}
          <!-- <h1>CSS</h1> -->
          <JavaEditor bind:value {theme} />

        {:else}
          <!-- <h1>Simple</h1> -->
  
          <SimpleEditor bind:value {theme} />
        {/if}
      </Pane>
      <Pane minSize={20} size={40} className="overflow-hidden">
        {#if projectdata.type === "project"}
          <div class="bg-base-200" style="padding:4px;display:flex;justify-content:space-between;">
            <span on:click={refreshIframe} class="" style="cursor:pointer;font-size: 0.8em;">Refresh</span>
  
            <a target="_blank" style="font-size: 0.8em;" href={iframeURL}
              >{iframeURL}</a
            >
          </div>
        {/if}
  
        {#if container_name}
          <!-- <Terminal container_name={container_name} /> -->
          <iframe
            allowFullScreen
            style={projectdata.lang.prog_lang === "html"
              ? "background:white"
              : ""}
            id="containerFrame"
            width={"100%"}
            height={"96%"}
            src={projectdata.lang == 1
              ? "https://" +
                container_name +
                ".thelearningsetu.com/python/"
              : "https://" +
                container_name +
                ".thelearningsetu.com/" +
                projectdata.lang.prog_lang +
                "/"}
          />

        {:else}
          <p>Creating Container...</p>
        {/if}
      </Pane>
    </Splitpanes>
  
</div>


<style>

</style>