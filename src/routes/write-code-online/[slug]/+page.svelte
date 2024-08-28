

<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import CodeEditor from '../../../components/CodeEditor.svelte';
    import user from '../../../stores/auth';
    import LoginWrapper from '../../../components/LoginWrapper.svelte';

/** @type {import('./$types').PageData} */
export let data;

let container_name;
let API_URL = import.meta.env.VITE_API_URL;

let value = "";
let projectcode;
let socket;
let is_mount = false;


  let url = API_URL + "editor/projectcodes/?project="+data.id;
      fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            value = data1['results'][0].code;
            projectcode = data1['results'][0];
            
           } else {
          }
  }).catch(error=>{ })


// onMount(async ()=>{
//     let url = import.meta.env.VITE_HANDLER_WS;
//     const chatSocket = new WebSocket(url);
//     socket = chatSocket;

//     socket.onopen = () => {
//         if (data.lang.prog_lang==="python"){
//           localStorage.setItem('pty-cmd', 'python main.py')
//         } else if (data.lang.prog_lang==="nodejs"){
//           localStorage.setItem('pty-cmd', 'node main.js')
//         }
//         socket.send(JSON.stringify(
//           {'task':"create_container", "container_name":data.container_name,
//           'image_name':"terminal-image",
//           } 
//         ));
//     }

//     socket.onmessage = function(e){ 
//       let msg_data = JSON.parse(e.data);
//       if (msg_data['message']==="container_created"){
//         console.log("Got the creation")
//         setTimeout(()=>{
//           container_name = data.container_name;
//         }, 1000)
//       }
//     };
//     is_mount = true;
// })


</script>
<svelte:head>
  <title>{data.name} | Coding Chaska Lab </title>
  <meta property="description" content={`${data.name} - Write Code Online editor`} />
</svelte:head>


<LoginWrapper>

<CodeEditor projectdata={data}/>

</LoginWrapper>


