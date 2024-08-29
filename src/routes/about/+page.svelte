<script>
  import Footer from "../../components/Footer.svelte";
  import Navbar from "../../components/Navbar.svelte";
</script>

<svelte:head>
  <title>About Us | Coding Chaska Lab</title>
  <meta name="description" content="Discover Coding Chaska Lab, a cutting-edge online code editor for Python, NodeJs, HTML, and more. Learn about our mission, technologies, and continuous efforts to enhance your coding experience." />
  <meta name="keywords" content="about us, Coding Chaska Lab, online code editor, Python, NodeJs, HTML, Svelte, Code Mirror, coding platform" />
  <meta property="og:title" content="About Us | Coding Chaska Lab" />
  <meta property="og:description" content="Explore Coding Chaska Lab, our state-of-the-art online code editor, and our mission to deliver an efficient and enjoyable coding environment." />
  <!-- <meta property="og:image" content="/path/to/your/og-image.jpg" /> -->
  <meta property="og:url" content="https://www.codingchaskalab.com/about" />
  <meta property="og:type" content="website" />
</svelte:head>

<Navbar />

<div class="px-4 text-sm breadcrumbs">
  <ul class="flex items-center space-x-2">
    <li>
      <a href="/" class="flex items-center text-primary hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </a>
    </li>
    <li class="text-gray-500">About</li>
  </ul>
</div>

<div class="px-4 md:w-5/6 min-h-screen prose max-w-none lg:w-4/6 xl:w-3/6 mx-auto mt-6 pb-16">
  <h1 class="text-4xl font-bold mb-4">About Coding Chaska Lab</h1>
  
  <p class="mb-6">
    Welcome to <strong>Coding Chaska Lab</strong>, a division of Coding Chaska, where we are committed to providing an innovative and user-friendly online code editor. Our platform is designed for developers, students, and coding enthusiasts who seek a fast and efficient environment for coding in multiple languages.
  </p>
  
  <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
  <p class="mb-6">
    At Coding Chaska Lab, our mission is to make coding accessible and enjoyable for everyone. We strive to create a seamless, efficient, and interactive coding experience that empowers you to learn, experiment, and build projects with ease. Whether you're a beginner or an experienced coder, our platform is tailored to meet your needs.
  </p>
  
  <h2 class="text-3xl font-bold mb-4">Technologies We Use</h2>
  <p class="mb-6">
    We leverage the power of modern web technologies such as <strong>Svelte</strong> and <strong>CodeMirror</strong> to deliver a lightweight and responsive coding interface. Our platform currently supports HTML, Python, NodeJS, Java, and C Programming, with more languages and features being added regularly.
  </p>
  
  <h2 class="text-3xl font-bold mb-4">Why Choose Coding Chaska Lab?</h2>
  <ul class="list-disc pl-6 mb-6">
    <li>Fast and responsive online code editor with real-time preview.</li>
    <li>No login required to start coding immediately.</li>
    <li>Save your work by logging in and access it from anywhere.</li>
    <li>Support for multiple programming languages, with new additions on the way.</li>
    <li>Continuous updates and improvements based on user feedback.</li>
  </ul>
  
  <h2 class="text-3xl font-bold mb-4">Join Our Community</h2>
  <p class="mb-6">
    We value your feedback and suggestions as we work to enhance our platform. If you encounter any issues or have ideas for new features, please reach out to us through our 
    <a target="_blank" href="https://www.codingchaska.com/contact" class="text-primary hover:underline">contact page</a>. Your input is essential to our ongoing development and commitment to providing a superior coding experience.
  </p>
  
  <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
  <p class="mb-6">
    Follow us on social media and subscribe to our newsletter to stay informed about new features, updates, and coding tips. We are excited to continue growing with our community and can't wait to see what you'll create with Coding Chaska Lab!
  </p>
</div>

<Footer />
