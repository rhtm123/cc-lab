import { c as create_ssr_component, e as escape } from './index3-046add8a.js';
import { u as user } from './auth-9bde3a3b.js';

const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loggedIn;
  let user1;
  user.subscribe((value) => {
    if (value) {
      user1 = JSON.parse(value);
    } else {
      user1 = null;
    }
  });
  loggedIn = !!user1;
  return `<nav class="${"split-nav"}"><div class="${"nav-brand"}"><h4><a href="${"/"}">CC Lab</a></h4></div>
  <div class="${"collapsible"}"><input id="${"collapsible1"}" type="${"checkbox"}" name="${"collapsible1"}">
    <label for="${"collapsible1"}"><div class="${"bar1"}"></div>
      <div class="${"bar2"}"></div>
      <div class="${"bar3"}"></div></label>
    <div class="${"collapsible-body"}"><ul class="${"inline"}"><li><a href="${"/coding-problems"}">Coding Problems</a></li>
        <li><a href="${"/about"}">About</a></li>

        ${loggedIn ? `<li><a href="${"/profile"}">${escape(user1.user.firstname)}</a></li>
          <button>log out</button>` : `<li><a href="${"/login"}">login</a></li>`}</ul></div></div></nav>`;
});

export { Navbar as N };
//# sourceMappingURL=Navbar-bdcaf830.js.map
