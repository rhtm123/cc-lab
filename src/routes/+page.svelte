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
      <a href="/online-editor">
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

<div class="hero bg-base-200 p-4 py-16">
  <div class="hero-content flex flex-col text-center max-w-5xl mx-auto">
    <h1 class="text-5xl font-bold mb-4">Try Our Editors Without Login</h1>
    <p class="text-lg mb-6">
      Get started immediately! Try writing and running code in Python, NodeJs, Java, or HTML without needing to log in. Experience the ease and convenience of our editors. If you choose to log in, your code will be securely stored on our servers, allowing you to access and continue your work anytime, anywhere.
    </p>
    <div>
    <a href="/online-editor/html">
      <button class="btn btn-primary">Online HTML Editor</button>
    </a>

    <a href="/online-editor/python">
      <button class="btn btn-primary">Online Python Editor</button>
    </a>
   </div>

  </div>
</div>

<div class="hero bg-base-100 p-4 py-16">
  <div class="hero-content flex flex-col lg:flex-row justify-between items-center max-w-8xl mx-auto">
    <div class="flex-1 lg:mr-8">
      <h1 class="text-5xl font-bold mb-4">Why Choose Our Platform?</h1>
      <ul class="list-disc list-inside text-lg mb-6">
        <li>Fast and Responsive Online Code Editors</li>
        <li>Support for Multiple Programming Languages</li>
        <li>No Need to Install Software or Plugins</li>
        <li>Save and Access Your Code from Anywhere</li>
        <li>Interactive and User-Friendly Interface</li>
      </ul>
      <a href="/about">
        <button class="btn btn-primary">Learn More</button>
      </a>
    </div>
    <div class="flex-1">
      <img src="/img/online-editor.jpg" alt="Online Code Editor" class="rounded-lg shadow-lg">
    </div>
  </div>
</div>


<div class="hero bg-base-200 p-4 md:p-8 py-16">
  <div class="hero-content flex flex-col text-center max-w-5xl mx-auto">
    <h1 class="text-5xl font-bold mb-4">Unlock Your Coding Potential</h1>
    <p class="text-lg mb-6">
      Whether you're a beginner or an experienced programmer, our platform is designed to help you enhance your coding skills. With real-time collaboration features, code sharing, and a wide range of supported languages, you can take your coding to the next level.
    </p>
    <a href="/features">
      <button class="btn btn-primary">Discover More</button>
    </a>
  </div>
</div>


<div class="hero bg-primary text-primary-content p-4 py-16">
  <div class="hero-content flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto">
    <div class="flex-1 text-center lg:text-left lg:mr-8">
      <h1 class="text-5xl font-bold mb-4">Join Thousands of Coders Worldwide</h1>
      <p class="text-lg mb-6">Start coding now and become a part of our growing community. Enhance your skills, solve challenges, and build something amazing!</p>
      <a href="/login">
        <button class="btn btn-secondary">Sign Up for Free</button>
      </a>
    </div>
    <div class="flex-1">
      <img src="/img/software-developer.jpg" alt="Join Our Community" class="rounded-lg shadow-lg">
    </div>
  </div>
</div>

<Footer />
