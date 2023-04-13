import './index-36410280.js';

async function load({ params, fetch }) {
  let slug = params.slug;
  let url = `https://codingchaska.up.railway.app/api/v1/editor/project/${slug}/`;
  let res = await fetch(url);
  return res.json();
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 10;
const component = async () => (await import('./_page.svelte-d2bdd702.js')).default;
const file = '_app/immutable/entry/write-code-online-_slug_-page.svelte.6bbb6e2b.js';
const universal_id = "src/routes/write-code-online/[slug]/+page.js";
const imports = ["_app/immutable/entry/write-code-online-_slug_-page.svelte.6bbb6e2b.js","_app/immutable/chunks/index.7d0cd1aa.js","_app/immutable/chunks/CodeEditor.b7ef19aa.js","_app/immutable/chunks/index.5dc4b988.js","_app/immutable/chunks/auth.c1f5eb36.js","_app/immutable/chunks/LoginRequired.a317ca5a.js","_app/immutable/chunks/stores.37722b3e.js","_app/immutable/chunks/singletons.b204ce40.js","_app/immutable/entry/write-code-online-_slug_-page.js.5fcd0ac6.js","_app/immutable/chunks/index.2defaa64.js","_app/immutable/chunks/control.e7f5239e.js","_app/immutable/chunks/_page.c80da7e1.js"];
const stylesheets = ["_app/immutable/assets/CodeEditor.3feb27e1.css"];
const fonts = [];

export { component, file, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=10-a3e14b41.js.map
