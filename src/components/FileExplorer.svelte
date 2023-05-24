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

const saveNow = () => {
    
    socket?.send(JSON.stringify({'task':"save_code",'code':explorer.code,"container_name":container_name,"file_name":folder_name+explorer.file_name}));
    localStorage.setItem(folder_name+explorer.file_name,explorer.code)
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
       activeFile.update(()=>explorer);
        }else{
            expand = !expand;
        }
    }



</script>

<div class="">
{#if explorer.id === activeFile1.id}
<div class="active-file"> 
    {explorer.file_name}
</div>
{:else}
<span on:click={()=>handleClick()}>
    {explorer.file_name}
</span>
{/if}

<div style="margin-left: 8px;">
{#if expand}
{#each explorer.files as explore}

    <svelte:self explorer={explore}
    folder_name={folder_name+explorer.file_name+'/'} 
    socket={socket}
    container_name={container_name}
    />
{/each}
{/if}
</div>

</div>
