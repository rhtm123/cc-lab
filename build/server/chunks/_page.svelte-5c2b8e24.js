import { c as create_ssr_component, v as validate_component, d as each, b as add_attribute, e as escape } from './index3-046add8a.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import 'js-cookie';
import { u as user } from './auth-9bde3a3b.js';
import { L as LoginRequired } from './LoginRequired-7b07281e.js';
import './index2-2089616d.js';
import './stores-059155cd.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user1;
  let languages = [];
  let loginChecked = false;
  user.subscribe((value) => {
    if (value) {
      user1 = JSON.parse(value);
    } else {
      user1 = null;
    }
    loginChecked = true;
  });
  let new_project_name = "";
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<div class="${"container"}">${loginChecked && !user1 ? `${validate_component(LoginRequired, "LoginRequired").$$render($$result, {}, {}, {})}` : ``}

    ${loginChecked && user1 ? `<div class="${"section"}"><br>
    
          <div class="${""}"><label class="${"paper-btn"}" for="${"modal-1"}">Start Coding</label></div>
          <input class="${"modal-state"}" id="${"modal-1"}" type="${"checkbox"}">
          <div class="${"modal"}"><label class="${"modal-bg"}" for="${"modal-1"}"></label>
            <div class="${"modal-body"}"><label class="${"btn-close"}" for="${"modal-1"}">X</label>
              <h4 class="${"modal-title"}">Create New Project</h4>

              <div class="${"form-group"}"><label>Choose programming language:</label>
              <br>
              <select>${each(languages, (lang) => {
    return `<option${add_attribute("value", lang.id, 0)}>${escape(lang.prog_lang)}</option>`;
  })}</select></div>

              <div class="${"form-group"}"><input placeholder="${"Project Name"}" text="${"Project Name"}"${add_attribute("value", new_project_name, 0)}></div>
              ${`<button>Start Now</button>`}

              ${``}</div></div>


    ${`<p>Loading...</p>`}

    

    ${``}

    ${``}
    <br>
    <br></div>` : ``}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5c2b8e24.js.map
