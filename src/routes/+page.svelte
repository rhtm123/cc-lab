<script>
  // @ts-nocheck
  
      import Navbar from "../components/Navbar.svelte";
      import Footer from "../components/Footer.svelte";
  
      // import { API_URL } from "$env/static/public";
      // let API_URL = import.meta.env.VITE_API_URL;

  
   </script>
  
  <svelte:head>
    <title>Write Code Online, Coding Problems| Coding Chaska Lab </title>
    <meta property="description" content={`Online HTML, CSS & JavaScript Editor, Solve Coding Problems in Python`} />
  </svelte:head>
  
  
  <Navbar />
<div class="p-4 hero">
  <div class="hero-content md:px-4 py-24 flex-col lg:flex-row-reverse">

      <div class="flex-1">
        <video class="rounded-lg shadow-lg" autoplay>
          <source src="/video/codes.mp4" type="video/mp4">
          <!-- <source src="mov_bbb.ogg" type="video/ogg"> -->
          Your browser does not support HTML video.
        </video>
      <!-- <img src="/img/home.jpg" alt="Coding Chaska Lab" /> -->
      </div>
    <div class="flex-1">
      <h1 class="text-5xl font-bold">Write Code Online</h1>
      <p class="py-6">Code online effortlessly with our user-friendly platform. Write, run, and experiment with Python, NodeJs, Java, and HTML in your web browser. Get coding now!</p>

      <a href="/write-code-online"><button class="btn btn-primary">Get Started</button></a>


    </div>
  </div>
</div>

<hr />

<div class="hero bg-base-100 p-4" style="border-top:1.2px solid grey;">
  <div class="hero-content py-24 md:px-4 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto flex-col lg:flex-row text-center">
    




    <div><h1 class="text-5xl font-bold">Solve Coding Problems</h1>
      <p class="py-6">
        Solving coding problems is an essential skill for any programmer.
        It helps to develop logical thinking, creativity, and problem-solving abilities. 
        By solving coding problems regularly, programmers can become more confident and proficient in their chosen programming language and domain.
      </p>
      
      <a href="/coding-problems"><button class="btn btn-primary">Solve Now</button></a> 


      </div>

    </div>
  </div>

  <hr />
  <Footer />