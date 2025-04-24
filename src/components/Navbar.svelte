
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

<div class="navbar bg-base-100/80 backdrop-blur-sm border-b border-base-300/50 sticky top-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 hover:bg-base-100/95">
  <div class="navbar-start">
    <!-- Mobile dropdown -->
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </label>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-300/30">
        <li><a href="/coding-problems" class="hover:bg-primary/10 active:bg-primary/20">Coding Problems</a></li>
        <li><a href="/about" class="hover:bg-primary/10 active:bg-primary/20">About</a></li>
        {#if loggedIn}
          <li><a href="/profile" class="hover:bg-primary/10 active:bg-primary/20">Profile</a></li>
          <li><a href="/cc-coins" class="hover:bg-primary/10 active:bg-primary/20">CC Coins: {user1.user.total_points} 🪙</a></li>
          <li><a on:click={logoutHandle} href="/" class="text-error hover:bg-error/10 active:bg-error/20">Logout</a></li>
        {:else}
          <li><a href="/login" class="hover:bg-primary/10 active:bg-primary/20">Login</a></li>
        {/if}
        <li class="border-t border-base-300/30 mt-2 pt-2">
          <ThemeChange />
        </li>
      </ul>
    </div>
    
    <!-- Logo/Brand -->
    <a href="/" class="btn btn-ghost px-2 hover:bg-transparent active:bg-transparent">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CC LAB</span>
      </div>
    </a>
  </div>

  <!-- Desktop navigation -->
  <div class="navbar-end hidden md:flex gap-1">
    <ul class="menu-horizontal items-center px-1 gap-1">
      <li>
        <a href="/coding-problems" class="btn btn-ghost font-medium rounded-btn hover:bg-primary/10 hover:text-primary">
          Coding Problems
        </a>
      </li>
      <li>
        <a href="/about" class="btn btn-ghost font-medium rounded-btn hover:bg-primary/10 hover:text-primary">
          About
        </a>
      </li>
      
      {#if loggedIn}
        <li class="dropdown dropdown-hover dropdown-end">
          <label tabindex="0" class="btn btn-ghost font-medium rounded-btn hover:bg-primary/10 hover:text-primary">
            <div class="flex items-center gap-1">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-8">
                  <span class="text-xs">{user1.user.firstname.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <span>{user1.user.firstname}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300/30 z-[100]">
            <li>
              <a href="/profile" class="hover:bg-primary/10 active:bg-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                Profile
              </a>
            </li>
            <li>
              <a href="/cc-coins" class="hover:bg-primary/10 active:bg-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                </svg>
                CC Coins: {user1.user.total_points}
              </a>
            </li>
            <li class="border-t border-base-300/30 mt-1">
              <a on:click={logoutHandle} href="/" class="text-error hover:bg-error/10 active:bg-error/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </li>
      {:else}
        <li>
          <a href="/login" class="btn btn-ghost font-medium rounded-btn hover:bg-primary/10 hover:text-primary">
            Login
          </a>
        </li>
        
      {/if}
      
      <li class="px-2">
        <ThemeChange />
      </li>
    </ul>
  </div>
</div>