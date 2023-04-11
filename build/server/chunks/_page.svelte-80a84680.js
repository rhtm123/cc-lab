import { c as create_ssr_component, v as validate_component, d as each, e as escape, b as add_attribute } from './index3-046add8a.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import './auth-9bde3a3b.js';
import './index2-2089616d.js';
import 'js-cookie';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let data1 = data.results;
  let next = data.next;
  let loading = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<ul class="${"breadcrumb"}"><li><a href="${"/"}">Home</a></li>
    <li>Coding Problems</li></ul>

<div class="${"container section"}"><div class="${"row"}"><div class="${"col-3"}"><p class="${"text-grey"}">Ordering: </p>
                      
                <div><select class="${"select"}"><option value="${"updated"}">Old First</option><option value="${"-updated"}">New First</option></select></div>
            
                <p>Select Difficulty: </p>
                      
                <div><select><option value="${""}">All</option><option value="${"very easy"}">Very Easy</option><option value="${"easy"}">Easy</option><option value="${"medium"}">Medium</option><option value="${"hard"}">Hard</option></select></div></div>

        <div class="${"col-9"}">${data1.length === 0 && !loading ? `<p>Coding Problem is not available.</p>` : ``}

            ${each(data1, (item, key) => {
    return `<div><h4 class="${"margin-bottom-none"}">${escape(key + 1)}_ <a${add_attribute("href", "/coding-problem/" + item.slug, 0)}>${escape(item.name)}</a></h4>
                <p>Created by- ${escape(item.creator.firstname)} ${escape(item.creator.lastname)}</p>
            </div>`;
  })}
    
        ${next && !loading ? `<br>
            <button>Load More</button>` : ``}
    
        ${``}</div></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-80a84680.js.map
