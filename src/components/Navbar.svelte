
<script>

import  user  from "../stores/auth";
  // @ts-ignore
  let user1
  
  user.subscribe(value => {
    if (value) {user1 = JSON.parse(value);}
    else{user1=null}
	});

  $:loggedIn = !!user1;

  const logoutHandle = () => {
    user.set(null); localStorage.removeItem("user");
  }

  import ThemeChange from "./ThemeChange.svelte";

</script>

<div class="navbar bg-base-100 p-0 min-h-0 " style="border-bottom:1.2px solid grey" >
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/coding-problems">Coding Problems</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case text-xl">CC LAB</a>
    </div>
    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/coding-problems">Coding Problems</a></li>
        <li><a href="/about">About</a></li>

        {#if loggedIn}
          <li><a href="/profile">{user1.user.firstname}</a></li>
          <li><a  on:click={logoutHandle} href="/">Logout</a></li>

        {:else}
          <li><a href="/login">login</a></li>
        {/if}
        <li> 
            <ThemeChange />
        </li>
      </ul>
    </div>
    
  </div>