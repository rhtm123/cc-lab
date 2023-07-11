<script>
// @ts-nocheck

    import { GoogleLogin } from 'google-login-svelte';
    import Navbar from '../../components/Navbar.svelte';
    import { page } from '$app/stores';
    import user from '../../stores/auth';
    import { goto } from '$app/navigation';
    let GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    let API_URL = import.meta.env.VITE_API_URL;

   //  import ThemeChange from '../../components/ThemeChange.svelte';


    const nextPage = $page.url.searchParams.get("nextPage");
   //  console.log(nextPage);

   let user1;
   user.subscribe(value => {
      if (value) {user1 = JSON.parse(value);}
      else{user1=null}
	});

    import { postData } from '../../utils/auth';
    import Footer from '../../components/Footer.svelte';
 
    /**
     * @type {{ name: any; } | null}
     */
    let profile = null
 
    const handleSignin = (event) => {
       profile = event.detail.profileObj
       console.log(`User signed in successfully`);
       

      let firstname = profile.givenName
      let lastname = profile.familyName
      let email = profile.email

      console.log(profile);

       let r = (Math.random() + 1).toString(36).substring(7);
       let url = API_URL+`auth/users/`;

       postData(url, {"password":r, "firstname":firstname, "lastname":lastname,"email":email}, "POST")
        .then(data => {
         //  console.log(data);

         getUser(email)
        }).catch(error => {
          getUser(email)
          console.log(error);
      })
    }
    
    const getUser = (email) => {

      let url =  API_URL+ 'auth/get-user-email/';
        postData(url, {"email":email})
          .then(data => {
            //  console.log(data);
             localStorage.setItem("user", JSON.stringify(data));
             user.set(JSON.stringify(data));
             console.log(data);
             if (nextPage) goto(nextPage);
          }).catch(error => {
            console.log(error)
        })
    }

    const handleFailure = (event) => {
       const err = event.detail
       console.error(`Error while signing in: `, err)
    }

 </script>

<svelte:head>
   <title>Login | Coding Chaska Lab </title>
   <meta property="description" content={`Login with Google account & Access the restricted features of Coding Chaska Lab`} />
 </svelte:head>

<Navbar />

<div class="container">

   <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            Home
          </a>
        </li> 
         
        <li>
          Login Page
        </li>
      </ul>
    </div>

    <br />

<div class="md:w-3/4 prose max-w-none m-auto">
 
{#if user1}

<div class="section" style="min-height:60vh">
   <br />
   <br />
   <div class="text-center">
   <h2>You are logged In</h2> 
   <button class="btn btn-primary"><a href="/">Go to Home Page</a></button>
   </div>
   <br />
   <br />
   <br />

</div>


{:else}

<div class="text-center" style="min-height:60vh">

   <br />
   <br />
   <br />
   <br />
    <GoogleLogin 
       clientId={GOOGLE_CLIENT_ID}
       on:success={handleSignin}
       on:failure={handleFailure}
       let:signIn
    >
       <button class="btn" on:click={signIn}>
          Sign in with Google
       </button>
    </GoogleLogin>

   </div>

{/if}

</div>
</div>

<br />

<Footer />