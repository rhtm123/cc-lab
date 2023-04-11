import { c as create_ssr_component, a as subscribe, e as escape } from './index3-046add8a.js';
import { p as page } from './stores-059155cd.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}: ${escape($page.error.message)}</h1>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-8a767fd2.js.map
