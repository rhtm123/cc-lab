<script>
  // @ts-nocheck
  
  import Navbar from "../../components/Navbar.svelte";
  import Footer from "../../components/Footer.svelte";
  import CodingProblemLists from "../../components/CodingProblemLists.svelte";
  
  /** @type {import('./$types').PageData} */
  export let data;
  </script>
  
  <svelte:head>
    <title>Coding Problems | Coding Chaska Lab</title>
    <meta name="description" content="Explore a wide range of coding problems including Python basics, decision making, loops, functions, and object-oriented programming. Improve your coding skills with Coding Chaska Lab." />
    <meta name="keywords" content="coding problems, Python coding problems, programming practice, Python basics, decision making, loops, functions, OOP" />
    <meta property="og:title" content="Coding Problems | Coding Chaska Lab" />
    <meta property="og:description" content="Explore coding problems in Python and other languages to enhance your programming skills. Solve problems related to Python basics, decision making, loops, functions, and object-oriented programming." />
    <!-- <meta property="og:image" content="/path/to/your/og-image.jpg" /> -->
    <meta property="og:url" content="https://www.codingchaskalab.com/coding-problems" />
    <meta property="og:type" content="website" />
  </svelte:head>
  
  <Navbar />
  
  <div class="breadcrumbs px-4 py-2 bg-base-100">
    <ul class="flex items-center space-x-2 text-sm">
      <li>
        <a href="/" class="flex items-center text-blue-500 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          Home
        </a>
      </li>
      <li class="text-gray-500">Coding Problems</li>
    </ul>
  </div>
  
  <div class="p-4 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto mt-2">
    <h1 class="text-4xl font-bold mb-4 text-center">Coding Problems</h1>
    <p class="text mb-6 opacity-95">Enhance your coding skills with our curated list of coding problems. Practice Python basics, decision making, loops, functions, and object-oriented programming to become a more proficient programmer.</p>
  
    <CodingProblemLists data={data} />
  </div>
  
  <br />
  <Footer />
  