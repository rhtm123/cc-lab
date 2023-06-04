<script>
// @ts-nocheck

    import { GoogleLogin } from 'google-login-svelte';
    import Navbar from '../../components/Navbar.svelte';
    import { page } from '$app/stores';
    import user from '../../stores/auth';
    import { goto } from '$app/navigation';
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
   <title>About | Coding Chaska Lab </title>
   <meta property="description" content={`Login with Google account & Access the restricted features of Coding Chaska Lab`} />
 </svelte:head>
 
 
{#if user1}


<Navbar />


<div class="section" style="min-height:80vh">
   <br />
   <br />
   <div class="text-center">
   <h4>You are logged In</h4> 
   <button><a href="/">Go to Home Page</a></button>
   </div>
   <br />
   <br />
   <br />
   <br />

</div>


{:else}


<div class="container section text-center" style="min-height:80vh">

   <br />
   <br />
   <br />
   <br />
   <br />
   <br />
   
    <GoogleLogin 
       clientId={"430888155183-p0e7c7m7qsbpt5p141chqpbk3491n04t.apps.googleusercontent.com"}
       on:success={handleSignin}
       on:failure={handleFailure}
       let:signIn
    >
       <button on:click={signIn}>
          Sign in with Google
       </button>
    </GoogleLogin>
   
   
   
   
    <!-- <button on:click={handleIt}>Just Do It</button> -->
   
   
    <br />
    <br />
   
    <br />
   <br />
   </div>

{/if}
