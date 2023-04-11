import { c as create_ssr_component, a as subscribe, v as validate_component, f as createEventDispatcher } from './index3-046add8a.js';
import { N as Navbar } from './Navbar-bdcaf830.js';
import { p as page } from './stores-059155cd.js';
import { u as user } from './auth-9bde3a3b.js';
import 'js-cookie';
import './index2-2089616d.js';

const GoogleLogin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { clientId } = $$props;
  let { scope = "profile email" } = $$props;
  let { redirectUri = void 0 } = $$props;
  let { cookiePolicy = "single_host_origin" } = $$props;
  let { loginHint = void 0 } = $$props;
  let { hostedDomain = void 0 } = $$props;
  let { prompt = "" } = $$props;
  let { responseType = void 0 } = $$props;
  let { autoLoad = void 0 } = $$props;
  let { uxMode = "popup" } = $$props;
  let { fetchBasicProfile = true } = $$props;
  let { isSignedIn = false } = $$props;
  let { discoveryDocs = void 0 } = $$props;
  let { accessType = "online" } = $$props;
  let { script = "https://apis.google.com/js/api.js" } = $$props;
  createEventDispatcher();
  let loaded = false;
  const signIn = (e) => {
    if (e)
      e.preventDefault();
  };
  const onLoadedChange = (loaded2) => {
    if (autoLoad)
      signIn();
  };
  if ($$props.clientId === void 0 && $$bindings.clientId && clientId !== void 0)
    $$bindings.clientId(clientId);
  if ($$props.scope === void 0 && $$bindings.scope && scope !== void 0)
    $$bindings.scope(scope);
  if ($$props.redirectUri === void 0 && $$bindings.redirectUri && redirectUri !== void 0)
    $$bindings.redirectUri(redirectUri);
  if ($$props.cookiePolicy === void 0 && $$bindings.cookiePolicy && cookiePolicy !== void 0)
    $$bindings.cookiePolicy(cookiePolicy);
  if ($$props.loginHint === void 0 && $$bindings.loginHint && loginHint !== void 0)
    $$bindings.loginHint(loginHint);
  if ($$props.hostedDomain === void 0 && $$bindings.hostedDomain && hostedDomain !== void 0)
    $$bindings.hostedDomain(hostedDomain);
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0)
    $$bindings.prompt(prompt);
  if ($$props.responseType === void 0 && $$bindings.responseType && responseType !== void 0)
    $$bindings.responseType(responseType);
  if ($$props.autoLoad === void 0 && $$bindings.autoLoad && autoLoad !== void 0)
    $$bindings.autoLoad(autoLoad);
  if ($$props.uxMode === void 0 && $$bindings.uxMode && uxMode !== void 0)
    $$bindings.uxMode(uxMode);
  if ($$props.fetchBasicProfile === void 0 && $$bindings.fetchBasicProfile && fetchBasicProfile !== void 0)
    $$bindings.fetchBasicProfile(fetchBasicProfile);
  if ($$props.isSignedIn === void 0 && $$bindings.isSignedIn && isSignedIn !== void 0)
    $$bindings.isSignedIn(isSignedIn);
  if ($$props.discoveryDocs === void 0 && $$bindings.discoveryDocs && discoveryDocs !== void 0)
    $$bindings.discoveryDocs(discoveryDocs);
  if ($$props.accessType === void 0 && $$bindings.accessType && accessType !== void 0)
    $$bindings.accessType(accessType);
  if ($$props.script === void 0 && $$bindings.script && script !== void 0)
    $$bindings.script(script);
  {
    onLoadedChange();
  }
  return `${slots.default ? slots.default({ signIn, disabled: !loaded }) : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.url.searchParams.get("nextPage");
  let user1;
  user.subscribe((value) => {
    if (value) {
      user1 = JSON.parse(value);
    } else {
      user1 = null;
    }
  });
  $$unsubscribe_page();
  return `${user1 ? `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<div class="${"section"}" style="${"min-height:80vh"}"><br>
   <br>
   <div class="${"text-center"}"><h4>You are logged In</h4> 
   <button><a href="${"/"}">Go to Home Page</a></button></div>
   <br>
   <br>
   <br>
   <br></div>` : `<div class="${"container section text-center"}" style="${"min-height:80vh"}"><br>
   <br>
   <br>
   <br>
   <br>
   <br>
   
    ${validate_component(GoogleLogin, "GoogleLogin").$$render(
    $$result,
    {
      clientId: "430888155183-p0e7c7m7qsbpt5p141chqpbk3491n04t.apps.googleusercontent.com"
    },
    {},
    {
      default: ({ signIn }) => {
        return `<button>Sign in with Google
       </button>`;
      }
    }
  )}
   
   
   
   
    
   
   
    <br>
    <br>
   
    <br>
   <br></div>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ad2405fb.js.map
