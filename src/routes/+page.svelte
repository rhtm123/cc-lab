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

<section class="hero p-4 bg-base-100">
  <div class="hero-content flex flex-col lg:flex-row lg:flex-row-reverse md:px-4 py-24 max-w-7xl mx-auto">

    <div class="flex-1 flex items-center justify-center mt-8 lg:mt-0">
      <video class="rounded-lg shadow-lg" autoplay muted loop aria-label="Coding demonstration video">
        <source src="/video/codes.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="flex-1 flex flex-col justify-center text-center lg:text-left">
      <h1 class="text-5xl font-bold mb-4">Write Code Online & Solve Coding Problems</h1>
      <p class="text-lg mb-6">
        Code online effortlessly with our user-friendly online code editor. Write, run, and experiment with Python, NodeJs, Java, and HTML directly in your web browser.
        <strong>Practice coding problems</strong> with our online judge, where you can <strong>run test cases</strong> and <strong>submit your code</strong> to see how you fare against others.
      </p>
      <div class="flex flex-col lg:flex-row">
        <a href="/online-editor" class="mb-4 lg:mb-0 lg:mr-4">
          <button class="btn btn-primary flex items-center" aria-label="Get Started with Online Editor">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            Get Started
          </button>
        </a>
        <a href="/coding-problems">
          <button class="btn btn-primary flex items-center" aria-label="Start Solving Coding Problems">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            Solve Coding Problems
          </button>
        </a>
      </div>
    </div>



  </div>
</section>


<div class="hero bg-base-200 p-4 py-16">
  <div class="hero-content flex flex-col text-center max-w-5xl mx-auto">
    <h1 class="text-5xl font-bold mb-4">Try Our Editors Without Login</h1>
    <p class="text-lg mb-6">
      Get started immediately! Try writing and running code in Python, NodeJs, Java, or HTML without needing to log in. Experience the ease and convenience of our editors. If you choose to log in, your code will be securely stored on our servers, allowing you to access and continue your work anytime, anywhere.
    </p>
    <ul class="list-none space-y-6">
      <li class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="/img/lang/html.png" alt="HTML" class="w-12 h-12 mr-4">
          <span class="text-lg font-semibold">Online HTML Editor</span>
        </div>
        <a href="/online-editor/html">
          <button class="btn btn-secondary btn-outline">Try Now</button>
        </a>
      </li>
      <li class="flex items-center gap-2 justify-between">
        <div class="flex items-center">
          <img src="/img/lang/python_logo.png" alt="Python" class="w-12 h-12 mr-4">
          <span class="text-lg font-semibold">Online Python Editor</span>
        </div>
        <a href="/online-editor/python">
          <button class="btn btn-secondary btn-outline">Try Now</button>
        </a>
      </li>
      <!-- <li class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="path/to/nodejs-logo.png" alt="NodeJs" class="w-12 h-12 mr-4">
          <span class="text-lg font-semibold">NodeJs Editor</span>
        </div>
        <a href="/online-editor/nodejs">
          <button class="btn btn-primary">Try Now</button>
        </a>
      </li>
      <li class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="path/to/java-logo.png" alt="Java" class="w-12 h-12 mr-4">
          <span class="text-lg font-semibold">Java Editor</span>
        </div>
        <a href="/online-editor/java">
          <button class="btn btn-primary">Try Now</button>
        </a>
      </li> -->
    </ul>
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
      <img src="/img/software-developer.jpg" alt="Online Code Editor" class="rounded-lg shadow-lg">
    </div>
  </div>
</div>

<div class="hero bg-primary text-white p-4 py-16">
  <div class="hero-content flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto">
    <div class="flex-1 text-center lg:text-left lg:mr-8">
      <h1 class="text-5xl font-bold mb-4">Join Thousands of Coders Worldwide</h1>
      <p class="text-lg mb-6">Start coding now and become a part of our growing community. Enhance your skills, solve challenges, and build something amazing!</p>
      <a href="/login">
        <button class="btn btn-secondary">Sign Up for Free</button>
      </a>
    </div>
    <div class="flex-1">
      <img src="/img/online-editor.jpg" alt="Join Our Community" class="rounded-lg shadow-lg">
    </div>
  </div>
</div>

<Footer />
