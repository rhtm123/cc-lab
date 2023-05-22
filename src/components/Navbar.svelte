<script>
// @ts-nocheck

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

<nav class="split-nav">
  <div class="nav-brand">
    <h4><a href="/">CC Lab</a></h4>
  </div>
  <div class="collapsible">
    <input id="collapsible1" type="checkbox" name="collapsible1">
    <label for="collapsible1">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </label>
    <div class="collapsible-body">
      <ul class="inline">
        <li><a href="/coding-problems">Coding Problems</a></li>
        <li><a href="/about">About</a></li>

        {#if loggedIn}
          <li><a href="/profile">{user1.user.firstname}</a></li>
          <button on:click={logoutHandle}>log out</button>

        {:else}
          <li><a href="/login">login</a></li>
        {/if}
          <li><ThemeChange /></li>
      </ul>
    </div>
  </div>
</nav>
