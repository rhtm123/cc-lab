import { c as create_ssr_component, v as validate_component } from './index3-046add8a.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import './auth-9bde3a3b.js';
import './index2-2089616d.js';
import 'js-cookie';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
<ul class="${"breadcrumb"}"><li><a href="${"/"}">Home</a></li>
    <li>Profile</li></ul>


<div class="${"container section"}"><br><br>
    <p>This page is under development</p>
    <br><br></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-e90eefe2.js.map
