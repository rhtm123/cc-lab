<script>
    import { onMount } from "svelte";
    import { activeFile } from "../stores/activeFile";

// @ts-nocheck

/**
     * @type {{ file_name: any; }}
     */
 export let explorer;
/**
     * @type {any}
     */
 export let folder_name;
 export let socket;
 export let container_name;
// console.log(explorer);
let expand = explorer.file_name==="src";

// console.log(container_name);

$: if(explorer.is_folder===false && container_name) { saveNow() }

// this is only for the first time
const saveNow = () => {
    // console.log("file_name = " + folder_name+explorer.file_name)
    // socket?.send(JSON.stringify({'task':"save_code",'code':explorer.code,"container_name":container_name,"file_name":folder_name+explorer.file_name}));
    localStorage.setItem(folder_name+explorer.file_name,explorer.code);
}

    let activeFile1;

    activeFile.subscribe(value => {
        activeFile1 = value;
    });

    const handleClick = () => {
        if(!explorer.is_folder){
       let code = localStorage.getItem(folder_name+explorer.file_name);
    //    console.log(code);
    //    console.log(code);
       explorer['file_location'] = folder_name+explorer.file_name
       explorer['code'] = code;
       // this code is updating the active file
    //    console.log(explorer);
       activeFile.update(()=>explorer);
        }else{
            expand = !expand;
        }
    }
</script>



{#if expand}

<li>
{explorer.file_name}

<ul class="p-1">
{#each explorer.files as explore}
    <svelte:self explorer={explore}
    folder_name={folder_name+explorer.file_name+'/'} 
    socket={socket}
    container_name={container_name}
    />
{/each}
</ul>
</li>
{:else}

{#if explorer.id === activeFile1.id}
<li class="text-success"> 
    {explorer.file_name}
</li>
{:else}
<li class="cursor-pointer" on:click={()=>handleClick()}>
    {explorer.file_name}
</li>
{/if}

{/if}

