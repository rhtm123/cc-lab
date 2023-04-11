import './index-36410280.js';

async function load({ fetch, setHeaders }) {
  let url = "https://codingchaska.up.railway.app/api/v1/editor/codingproblems/?is_published=true&level=&ordering=updated";
  let res = await fetch(url);
  return res.json();
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
const component = async () => (await import('./_page.svelte-80a84680.js')).default;
const file = '_app/immutable/entry/coding-problems-page.svelte.4f274798.js';
const universal_id = "src/routes/coding-problems/+page.js";
const imports = ["_app/immutable/entry/coding-problems-page.svelte.4f274798.js","_app/immutable/chunks/index.7d0cd1aa.js","_app/immutable/chunks/Navbar.51f16a42.js","_app/immutable/chunks/auth.84a3bd22.js","_app/immutable/chunks/index.5dc4b988.js","_app/immutable/entry/coding-problems-page.js.64b1eb18.js","_app/immutable/chunks/index.2defaa64.js","_app/immutable/chunks/control.e7f5239e.js","_app/immutable/chunks/_page.cd1786e4.js"];
const stylesheets = [];
const fonts = [];

export { component, file, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=6-c9c90dc7.js.map
