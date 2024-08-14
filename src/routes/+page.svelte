<script>
  // @ts-nocheck
  
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<svelte:head>
  <title>Write Code Online & Solve Coding Problems | Coding Chaska Lab</title>
  <meta name="description" content="Code online with our platform. Write, run, and experiment with Python, NodeJs, Java, and HTML. Solve coding problems and improve your programming skills. Get started today!" />
  <meta name="keywords" content="online code editor, coding problems, programming, Python, NodeJs, Java, HTML" />
  <meta property="og:title" content="Write Code Online & Solve Coding Problems | Coding Chaska Lab" />
  <meta property="og:description" content="Code online and solve coding problems effortlessly with our user-friendly platform. Get started today!" />
  <!-- <meta property="og:image" content="/path/to/your/image.jpg" /> -->
  <meta property="og:url" content="https://www.codingchaskalab.com" />
  <meta property="og:type" content="website" />
</svelte:head>

<Navbar />

<div class="hero p-4 bg-base-200">
  <div class="hero-content flex flex-col lg:flex-row-reverse md:px-4 py-24 max-w-7xl mx-auto">
    <div class="flex-1 flex items-center justify-center">
      <video class="rounded-lg shadow-lg" autoplay muted loop>
        <source src="/video/codes.mp4" type="video/mp4">
        <!-- <source src="mov_bbb.ogg" type="video/ogg"> -->
        Your browser does not support HTML5 video.
      </video>
    </div>
    <div class="flex-1 flex flex-col justify-center text-center lg:text-left">
      <h1 class="text-5xl font-bold mb-4">Write Code Online</h1>
      <p class="text-lg mb-6">Code online effortlessly with our user-friendly platform. Write, run, and experiment with Python, NodeJs, Java, and HTML directly in your web browser. Get coding now!</p>
      <a href="/write-code-online">
        <button class="btn btn-primary">Get Started</button>
      </a>
    </div>
  </div>
</div>


<div class="hero bg-base-100 p-4 min-h-screen">
  <div class="hero-content flex flex-col text-center max-w-4xl mx-auto">
    <h1 class="text-5xl font-bold mb-4">Solve Coding Problems</h1>
    <p class="text-lg mb-6">
      Solving coding problems is an essential skill for any programmer. It enhances logical thinking, creativity, and problem-solving abilities. By practicing coding problems regularly, you can become more proficient and confident in your programming skills.
    </p>
    <a href="/coding-problems">
      <button class="btn btn-primary">Solve Now</button>
    </a>
  </div>
</div>

<Footer />
