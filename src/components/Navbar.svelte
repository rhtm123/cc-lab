
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

<div class="navbar bg-base-200 p-0 min-h-0 " style="border-bottom:1.2px solid grey" >
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/coding-problems">Coding Problems</a></li>
          <li><a href="/about">About</a></li>
          <li> 
            <ThemeChange />
        </li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case text-xl">CC LAB</a>
    </div>
    <div class="navbar-end hidden md:flex">
      
      <ul class="menu hidden md:flex menu-horizontal px-1">
        <li><a href="/coding-problems">Coding Problems</a></li>
        <li><a href="/about">About</a></li>

        {#if loggedIn}
          

        <li>
          <div class="dropdown dropdown-end">
            <div class="dropdown">
              <label tabindex="0" class="flex">
                <span>{user1.user.firstname}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </label>

              <ul tabIndex={0} class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a href="/cc-coins">CC Coins : {user1.user.total_points} 🤑</a></li>

                <li><a href="/profile">Profile</a></li>
                <li><a  on:click={logoutHandle} href="/">Logout</a></li>
              </ul>
            </div>
          </div>
        </li>
        {:else}
            <li><a href="/login">Login</a></li>
        {/if}

      </ul>

      <ul class="menu menu-horizontal px-1">
        <li> 
          <ThemeChange />
      </li>
      </ul>
    </div>


    
  </div>