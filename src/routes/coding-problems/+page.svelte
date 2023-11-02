<script>
// @ts-nocheck

    // import CodingProblem from "../../components/CodingProblem.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import CodingProblemLists from "../../components/CodingProblemLists.svelte";

    // import { API_URL } from "$env/static/public";
    // let API_URL = import.meta.env.VITE_API_URL;

    /** @type {import('./$types').PageData} */
    export let data;





 </script>

  <svelte:head>
    <title>Coding Problems | Coding Chaska Lab </title>
    <meta property="description" content="Coding Problems - Python Basics, Python Decision Making, Python Loops, Python Functions, Python Native Data Types, Object Oriented Programming" />
  </svelte:head>


<Navbar />
<div class="px-2 text-sm breadcrumbs">
  <ul>
    <li>
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </a>
    </li> 
     
    <li>
      Coding Problems
    </li>
  </ul>
</div>

<div class="p-4 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">

    

     <CodingProblemLists data={data} />

</div>

<br />
<Footer />