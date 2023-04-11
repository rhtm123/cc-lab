import { c as create_ssr_component, v as validate_component } from './index3-046add8a.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import './auth-9bde3a3b.js';
import './index2-2089616d.js';
import 'js-cookie';

/* empty css                                                      */const css = {
  code: ".theme-wrapper.svelte-x7571a.svelte-x7571a{position:fixed;bottom:2rem;right:5%;cursor:pointer}@media only screen and (max-width: 664px){.theme-wrapper.svelte-x7571a.svelte-x7571a{right:3%}}.theme-wrapper.svelte-x7571a .dark.svelte-x7571a{color:#edfcf0}.theme-wrapper.svelte-x7571a .light.svelte-x7571a{color:#000}",
  map: null
};
const ThemeChange = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"theme-wrapper svelte-x7571a"}">${`<svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"24"}" height="${"24"}" fill="${"currentColor"}" class="${"bi bi-brightness-high light svelte-x7571a"}" viewBox="${"0 0 16 16"}"><path d="${"M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"}"></path></svg>`}
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

${validate_component(ThemeChange, "ThemeChange").$$render($$result, {}, {}, {})}

<div class="${"container section"}"><br> <br>
<div class="${"row flex-middle"}"><div class="${"col-6 col"}"><h3 class="${"margin-bottom-none"}">Write Code Online</h3>
        <p>Write code online without installing anything on your system.</p>
        <a href="${"/write-code-online"}"><button>Start Now</button></a></div>
    <div class="${"col-6 col"}"><img src="${"/home.jpg"}" alt="${"Coding Chaska Lab"}"></div></div>
<br></div>

<div class="${"section"}"><div class="${"container text-center"}"><h3 class="${"margin-bottom-none"}">Coding Problems</h3>
    <p>Solving coding problems is an essential skill for any programmer. It helps to develop logical thinking, creativity, and problem-solving abilities. Coding problems also allow programmers to practice and improve their coding skills, learn new concepts and techniques, and prepare for technical interviews. By solving coding problems regularly, programmers can become more confident and proficient in their chosen programming language and domain.
    </p>
    
    <a href="${"/coding-problems"}"><button>Solve Problems </button></a>
    <br>
    <br></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-217cd004.js.map
