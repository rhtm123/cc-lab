
<script>
// @ts-nocheck

    import { Pane, Splitpanes } from 'svelte-splitpanes';
    

    import { onMount } from 'svelte';
    import { postDataAuth } from '../utils/auth';
    import user from '../stores/auth';
    import PythonEditor from './Editors/PythonEditor.svelte';
    import JavaScriptEditor from './Editors/JavaScriptEditor.svelte';

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

    $:onMount(()=>{
        theme = localStorage.getItem("theme") || "light"; 
        // console.log("This is called");
    })


    user.subscribe(value => {
        if (value) {
          user1 = JSON.parse(value);
          // console.log(user1);
          // console.log(typeof projectdata.creator.id);
          // console.log(user1);
          if (projectdata.creator.id) {is_owner = user1.user.id === projectdata.creator.id;}
          else{is_owner = user1.user.id === projectdata.creator}
        };
    });

    $: {
    if (is_mount && socket){

    setTimeout(()=>{
      try{
      socket.send(JSON.stringify({'task':"save_code",'code':value,"container_name":container_name,"file_name":"/src/"+projectcode?.file_name}));   
      } catch(e){}
    }, 500)
  }
}


$: {
    if (is_mount && socket){
    setTimeout(()=>{
      try{
        let url = API_URL+`editor/projectcode/${projectcode.id}/`;
        if (user1.user.id===projectcode.project.creator){
            postDataAuth(url,user1.access,{code:value},'PATCH').then(data2 => {
            // console.log("saved")
            }).catch(error => {
              console.log(error,"error")
          })
        }
      } catch(e){}
    }, 2400)
  }
}

  let url = API_URL + "editor/projectcodes/?project="+projectdata.id;
      fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            value = data1['results'][0].code;
            projectcode = data1['results'][0]
           } else {
          }
  }).catch(error=>{ })


onMount(async ()=>{
    let url = import.meta.env.VITE_HANDLER_WS;
    const chatSocket = new WebSocket(url);
    socket = chatSocket;

    socket.onopen = () => {
        socket.send(JSON.stringify(
          {'task':"create_container", "container_name":projectdata.container_name,
          'image_name':"terminal-image",
          } 
      ));
    }

    socket.onmessage = function(e){ 
      let msg_data = JSON.parse(e.data);
      if (msg_data['message']==="container_created"){
        console.log("Got the creation")
        setTimeout(()=>{
          container_name = projectdata.container_name;
        }, 1000)
      }
    };
    
    is_mount = true;
})


  

</script>

{#if !is_owner}
  <span>*You are not the owner of this project</span>
{/if}
<Splitpanes style="height: 90vh" class="splitpanes">
	<Pane minSize={20} size={60}>
    {#if (projectdata.lang?.prog_lang==="python" || projectdata.lang===1)}
    <PythonEditor bind:value={value} theme={theme} />
    {:else if projectdata.lang.prog_lang==="nodejs"}
    <JavaScriptEditor bind:value={value} theme={theme} />
    {/if}
  </Pane>
	<Pane minSize={20}>
    {#if container_name}
    <iframe allowFullScreen
    id="containerFrame" width={"100%"} height={"100%"} src={projectdata.lang==1?  'https://'+container_name+'.thelearningsetu.com/terminal/python/': 'https://'+container_name+'.thelearningsetu.com/terminal/'+projectdata.lang.prog_lang+'/'} />
  {:else}
    <p>Creating Container...</p>
  {/if}

  </Pane>
</Splitpanes>
