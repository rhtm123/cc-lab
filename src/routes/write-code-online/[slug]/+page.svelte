

<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import CodeEditor from '../../../components/CodeEditor.svelte';
    import user from '../../../stores/auth';
    import LoginRequired from '../../../components/LoginRequired.svelte';

    // import SplitPane from '../../../components/SplitPane.svelte';

/** @type {import('./$types').PageData} */
export let data;

let container_name;
let API_URL = import.meta.env.VITE_API_URL;

// let handler_address = "http://143.110.190.99:5000/"

let value = "";
let socket;
let is_mount = false;
let user1;

user.subscribe(value => {
        if (value) {user1 = JSON.parse(value);}
        else{user1=null}
	});

// if (language==="python"){image_name="terminal-image"}
// else if (language==="html"){image_name="html-image"}



$: {
    if (is_mount && socket){

    setTimeout(()=>{
      try{
      socket.send(JSON.stringify({'task':"save_code",'code':value,"container_name":container_name,"file_name":"/src/main.py"}));   
      } catch(e){}
    }, 500)
  }
}

  let url = API_URL + "editor/projectcodes/?project="+data.id;
      fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            value = data1['results'][0].code;
           } else {
          }
  }).catch(error=>{ })


onMount(async ()=>{
    let url = import.meta.env.VITE_HANDLER_WS;
    const chatSocket = new WebSocket(url);
    socket = chatSocket;

    socket.onopen = () => {
        socket.send(JSON.stringify(
          {'task':"create_container", "container_name":data.container_name,
          'image_name':"terminal-image",
          } 
      ));
    }

    socket.onmessage = function(e){ 
      let msg_data = JSON.parse(e.data);
      if (msg_data['message']==="container_created"){
        console.log("Got the creation")
        setTimeout(()=>{
          container_name = data.container_name;
        }, 1000)
      }
    };

  //   socket.onmessage((event)=>{
  //     console.log(event);
  //   }
  // )
    
    is_mount = true;
})


</script>

{#if user1}
<nav class="split-nav">
    <div class="nav-brand">
      <h5><a href="/">Home</a> > <a href="/write-code-online">All Projects</a> > {data.name}</h5> 
    </div>
    <div class="collapsible">
      <input id="collapsible1" type="checkbox" name="collapsible1">
      <label for="collapsible1">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </label>
      <div class="collapsible-body">
        
      </div>
    </div>
</nav>


<CodeEditor projectdata={data}/>

{:else}

  <LoginRequired />
{/if}