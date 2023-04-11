import { c as create_ssr_component, v as validate_component, e as escape, b as add_attribute, d as each } from './index3-046add8a.js';
import 'js-cookie';
import { u as user } from './auth-9bde3a3b.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import './index2-2089616d.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  user.subscribe((value) => {
    if (value)
      JSON.parse(value);
  });
  let test_results = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
<ul class="${"breadcrumb"}"><li><a href="${"/"}">Home</a></li>
    <li><a href="${"/coding-problems"}">Coding Problems</a></li>
    <li>${escape(data.name)}</li></ul>


<input class="${"modal-state"}" id="${"modal-1"}" type="${"checkbox"}">
          <div class="${"modal"}"${add_attribute("style", "display:none", 0)}><div class="${"modal-body"}" style="${"min-width: 40%;"}"><label class="${"btn-close"}" for="${"modal-1"}">X</label>
              <h4 class="${"modal-title"}">Test Results</h4>
              ${`<p>Testing your code..</p>`}

              ${each(test_results, (test_result) => {
    return `<p>${escape(test_result.test.name)}

                  ${test_result.pass ? `<span class="${"text-success"}">Passed</span>` : `<span class="${"text-danger"}">Failed</span>`}</p>
                

                  ${test_result.result.error ? `<p>${escape(test_result.result.errorText)}
                  </p>` : ``}

                  ${test_result.test.type === "inputoutput" ? `<div><p>Sample Input: ${escape(test_result.test.input)}</p>
                    <p>Expected Output: ${escape(test_result.test.output)}</p>
                    <p>Your Output: ${escape(test_result.result.output)}</p>
                    </div>` : ``}`;
  })}

              ${``}</div></div>


<div class="${"section padding"}"><div class="${"tabs"}"><button${add_attribute("class", "btn-primary", 0)}>Problem</button>

                <button${add_attribute("class", "", 0)}>Solve</button></div>
    
        ${`<h2 class="${"header"}">${escape(data.name)}</h2>
            <div><!-- HTML_TAG_START -->${data.statement}<!-- HTML_TAG_END --></div>`}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-86ecacd3.js.map
