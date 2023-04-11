import { c as create_ssr_component, a as subscribe, e as escape } from './index3-046add8a.js';
import { p as page } from './stores-059155cd.js';

const LoginRequired = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  console.log(page);
  $$unsubscribe_page();
  return `<div class="${""}"><br>
    <br>
    <div class="${"text-center"}"><h4>Login is required</h4> 
    <button><a href="${"/login?nextPage=" + escape($page.url.pathname, true)}">Login</a></button></div>
    <br>
    <br></div>`;
});

export { LoginRequired as L };
//# sourceMappingURL=LoginRequired-7b07281e.js.map
