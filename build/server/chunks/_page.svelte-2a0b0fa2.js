import { c as create_ssr_component, v as validate_component } from './index3-046add8a.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import './auth-9bde3a3b.js';
import './index2-2089616d.js';
import 'js-cookie';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<ul class="${"breadcrumb"}"><li><a href="${"/"}">Home</a></li>
    <li>About</li></ul>

<div class="${"container section"}"><br>
    <p>CC Lab is part of Coding Chaska. CC Lab is an online editor. It is a lightweight and fast editor. 
        It is made with Svelte and Code Mirror. Currently, it is in the development phase. 
        If you have any problems with the website, please let us know at 
        <a href="${"https://www.codingchaska.com/contact"}">https://www.codingchaska.com/contact </a></p>
    <br>
    <br></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-2a0b0fa2.js.map
