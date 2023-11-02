<script>
    import { onMount } from "svelte";
    import user from "../stores/auth";
    import Check from "./svg/Check.svelte";
    import Document from "./svg/Document.svelte";

    export let item;
    export let key;

    let API_URL = import.meta.env.VITE_API_URL;
    let solved = false;


    let user1;
    user.subscribe(value => {
            if (value) {user1 = JSON.parse(value);}
            else{user1=null}
    });

    onMount(()=>{
        if(user1){
        let url = API_URL+`editor/userproblems/?user=${user1.user.id}&problem=${item.id}`;
        fetch(url)
        .then(async (response) => {
            if (response.ok) {
            var data1 = await response.json();
            if (data1.count>0){
                let up = data1.results[0]
                solved = up.accepted;
            } else {
                // createUserProblem()
          } 
            } 
        }).catch(error=>{  })
        }
    })


</script>



<tr>
    <td>
    {#if solved} 
        <Check />

    {/if}

    {#if !solved} 
        <Document />
    <!-- <svg fill="#ff0000" width="24px" height="24px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-1152" y="-64" width="1280" height="800" style="fill:none;"></rect> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <path id="square" d="M50.005,56l-35.989,0c-3.309,0 -5.995,-2.686 -5.995,-5.995l0,-36.011c0,-3.308 2.686,-5.995 5.995,-5.995l35.989,0c3.309,0 5.995,2.687 5.995,5.995l0,36.011c0,3.309 -2.686,5.995 -5.995,5.995Zm-0.993,-4.001c1.65,0 2.989,-1.339 2.989,-2.989l0,-34.021c0,-1.649 -1.339,-2.989 -2.989,-2.989l-34.003,0c-1.65,0 -2.989,1.34 -2.989,2.989l0,34.021c0,1.65 1.339,2.989 2.989,2.989l34.003,0Z"></path> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g></svg> -->
    {/if}
    </td>
    <td><a class="text-primary font-bold" href={"/coding-problem/"+item.slug}>{item.name}</a></td>
    <td>

    {#if item.creator.id}
    {item.creator?.firstname} {item.creator?.lastname} 
    {/if}
    </td>

    
  </tr>