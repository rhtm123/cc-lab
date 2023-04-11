import { e as error } from './index-36410280.js';

async function load({ params, fetch }) {
  let slug = params.slug;
  let url = `https://codingchaska.up.railway.app/api/v1/editor/codingproblem/${slug}/`;
  let res = await fetch(url);
  const error1 = res.ok ? false : true;
  if (error1) {
    throw error(404, {
      message: "Not found"
    });
  }
  return res.json();
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
const component = async () => (await import('./_page.svelte-86ecacd3.js')).default;
const file = '_app/immutable/entry/coding-problem-_slug_-page.svelte.d7f0ec43.js';
const universal_id = "src/routes/coding-problem/[slug]/+page.js";
const imports = ["_app/immutable/entry/coding-problem-_slug_-page.svelte.d7f0ec43.js","_app/immutable/chunks/index.7d0cd1aa.js","_app/immutable/chunks/CodeEditor.ce3d2898.js","_app/immutable/chunks/index.5dc4b988.js","_app/immutable/chunks/auth.84a3bd22.js","_app/immutable/chunks/LoginRequired.ae69db76.js","_app/immutable/chunks/stores.97498eed.js","_app/immutable/chunks/singletons.011dbdef.js","_app/immutable/chunks/Navbar.51f16a42.js","_app/immutable/entry/coding-problem-_slug_-page.js.f2f2faca.js","_app/immutable/chunks/index.2defaa64.js","_app/immutable/chunks/control.e7f5239e.js","_app/immutable/chunks/_page.912ebec0.js"];
const stylesheets = ["_app/immutable/assets/CodeEditor.3feb27e1.css"];
const fonts = [];

export { component, file, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=5-619135f6.js.map
