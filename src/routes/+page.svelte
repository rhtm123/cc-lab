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

<!-- Hero Section with Video -->
<section class="bg-gradient-to-br from-base-100 to-primary/10 py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row-reverse items-center gap-12">
      <!-- Video Demo -->
      <div class="flex-1 relative" data-aos="zoom-in">
        <div class="absolute -inset-4 bg-primary/20 rounded-2xl -z-10 rotate-3 hidden lg:block"></div>
        <video class="rounded-xl shadow-2xl w-full border-4 border-white/20" autoplay muted loop playsinline aria-label="Coding demonstration video">
          <source src="/video/codes.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            <span>Live Demo</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1" data-aos="fade-right">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Code, Run, Debug</span><br>
          All in Your Browser
        </h1>
        <p class="text-lg lg:text-xl mb-8 text-base-content/90">
          Experience our powerful online IDE supporting Python, NodeJS, Java, and HTML/CSS. Practice with our coding challenges, run test cases, and compare your solutions with the community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/online-editor" class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Start Coding Now
          </a>
          <a href="/coding-problems" class="btn btn-outline btn-lg border-2 hover:border-primary/50 hover:bg-primary/10">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Solve Challenges
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Try Editors Section -->
<section class="bg-base-200 py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
      Try Our <span class="text-primary">Zero-Setup</span> Editors
    </h2>
    <p class="text-lg lg:text-xl mb-12 max-w-3xl mx-auto">
      Start coding instantly with no login required. Your work saves automatically when you create an account.
    </p>
    
    <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <!-- HTML Editor -->
      <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
        <figure class="px-10 pt-10">
          <img src="/img/lang/html.png" alt="HTML" class="w-20 h-20 object-contain">
        </figure>
        <div class="card-body items-center text-center">
          <h3 class="card-title text-2xl mb-2">HTML/CSS/JS</h3>
          <p class="mb-4">Build and preview web pages in real-time</p>
          <a href="/online-editor/html" class="btn btn-primary btn-outline w-full">Try Editor</a>
        </div>
      </div>
      
      <!-- Python Editor -->
      <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="200">
        <figure class="px-10 pt-10">
          <img src="/img/lang/python_logo.png" alt="Python" class="w-20 h-20 object-contain">
        </figure>
        <div class="card-body items-center text-center">
          <h3 class="card-title text-2xl mb-2">Python 3</h3>
          <p class="mb-4">Run Python code with standard libraries</p>
          <a href="/online-editor/python" class="btn btn-primary btn-outline w-full">Try Editor</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-16 md:py-24 bg-base-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row items-center gap-12">
      <div class="flex-1" data-aos="fade-right">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
          Why Developers <span class="text-primary">Love</span> Our Platform
        </h2>
        
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0 mt-1">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold">Instant Setup</h3>
              <p class="text-base-content/80">No installations or configurations - just open and code</p>
            </div>
          </div>
          
          <div class="flex gap-4">
            <div class="flex-shrink-0 mt-1">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold">Secure Storage</h3>
              <p class="text-base-content/80">Your code is saved securely and accessible from anywhere</p>
            </div>
          </div>
          
          <!-- Add more features similarly -->
        </div>
        
        <div class="mt-10">
          <a href="/features" class="btn btn-primary btn-lg">Explore All Features</a>
        </div>
      </div>
      
      <div class="flex-1" data-aos="zoom-in">
        <img src="/img/software-developer.jpg" alt="Online Code Editor Features" class="rounded-xl shadow-2xl w-full">
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-primary to-secondary py-16 md:py-24 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row items-center gap-12">
      <div class="flex-1" data-aos="fade-right">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Join Our <span class="text-accent">Global</span> Coding Community
        </h2>
        <p class="text-lg lg:text-xl mb-8 opacity-90">
          Connect with thousands of developers, get help, share knowledge, and grow together.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/signup" class="btn btn-accent btn-lg shadow-lg">
            Create Free Account
          </a>
          <a href="https://discord.com/invite/8jHuMEBVPV" target="_blank" class="btn btn-outline btn-lg text-white border-white hover:bg-white/10">
            Join Discord Community
          </a>
        </div>
      </div>
      
      <div class="flex-1" data-aos="zoom-in">
        <img src="/img/coding-community.jpg" alt="Coding community" class="rounded-xl shadow-2xl w-full border-4 border-white/20">
      </div>
    </div>
  </div>
</section>

<Footer />
