<script>
   // @ts-nocheck
   
       import { GoogleLogin } from 'google-login-svelte';
       import Navbar from '../../components/Navbar.svelte';
       import { page } from '$app/stores';
       import user from '../../stores/auth';
       let GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
       let API_URL = import.meta.env.VITE_API_URL;
   
       let nextPage = $page.url.searchParams.get("nextPage") || "/";

       let user1;
       user.subscribe(value => {
         if (value) { 
           user1 = JSON.parse(value);
           // If the user is already logged in, redirect after a few seconds
           setTimeout(() => {

              if (window){
                if (nextPage){
                   let n = nextPage;
                   nextPage = null;
                   window.location.href = n
                }
              }
           }, 1000); // Redirect after 3 seconds
         } else {
           user1 = null;
         }
       });
   
       let loading = false;
   
       import { postData } from '../../utils/auth';
       import Footer from '../../components/Footer.svelte';
   
       let profile = null;
   
       const handleSignin = (event) => {
         loading = true;
         profile = event.detail.profileObj;
         console.log(`User signed in successfully`);
   
         let firstname = profile.givenName;
         let lastname = profile.familyName;
         let email = profile.email;
   
         let r = (Math.random() + 1).toString(36).substring(7);
         let url = API_URL + `auth/users/`;
   
         postData(url, {"password":r, "firstname":firstname, "lastname":lastname,"email":email}, "POST")
           .then(data => {
             getUser(email);
           }).catch(error => {
             getUser(email);
         });
       };
   
       const getUser = (email) => {
         let url = API_URL + 'auth/get-user-email/';
         postData(url, {"email":email})
           .then(data => {
             localStorage.setItem("user", JSON.stringify(data));
             user.set(JSON.stringify(data));
             loading = false;
             if (nextPage) { let n = nextPage; nextPage=null; 
              
              // goto(n)
              window.location.href = n;
            
            
            };
           }).catch(error => {
             console.log(error);
         });
       };
   
       const handleFailure = (event) => {
         const err = event.detail;
         console.error(`Error while signing in: `, err);
       };
   
   </script>
   
   <svelte:head>
      <title>Login | Coding Chaska Lab </title>
      <meta property="description" content={`Login with Google account & Access the restricted features of Coding Chaska Lab`} />
   </svelte:head>
   
   <Navbar />
   
   <div class="px-4">
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
             <h2>You are already Logged In</h2> 
             <p>Redirecting in a few seconds...</p>
             <a href="/"><button class="btn btn-primary">Go to Home Page</button></a>
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
           {#if loading}
             <p>Loading...</p>
           {:else}
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
           {/if}
         </div>
       {/if}
       </div>
   </div>
   
   <br />
   
   <Footer />
   