<script>
  import Footer from "../../components/Footer.svelte";
  import Navbar from "../../components/Navbar.svelte";
</script>

<svelte:head>
<title>About Us | Coding Chaska Lab</title>
<meta name="description" content="Coding Chaska Lab offers a cutting-edge online code editor for Python, NodeJs, HTML, and more. Learn about our mission, the technologies we use, and how we are continually improving our platform." />
<meta name="keywords" content="about us, Coding Chaska Lab, online code editor, Python, NodeJs, HTML, Svelte, Code Mirror" />
<meta property="og:title" content="About Us | Coding Chaska Lab" />
<meta property="og:description" content="Learn about Coding Chaska Lab, our online code editor, the technologies we use, and our mission to provide a streamlined coding experience." />
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
  Coding Chaska Lab, a division of Coding Chaska, is dedicated to providing a top-tier online code editor designed for speed and simplicity. Leveraging the efficiency of Svelte and Code Mirror, we offer a lightweight and agile coding experience. Although our platform is still in development, your feedback is crucial. For any issues or suggestions, please contact us at 
  <a target="_blank" href="https://www.codingchaska.com/contact" class="text-primary hover:underline">our contact page</a>. Your input helps us improve and enhance your coding journey.
</p>

<p class="mb-6">
  Currently, our platform supports coding in HTML, Python, NodeJS, Java, and C Programming. We are continuously working to expand our language offerings and features. Stay tuned for new updates and more opportunities to explore and develop your coding skills!
</p>

<p class="mb-6">
  Our mission is to make coding accessible and enjoyable for everyone. We are committed to providing a seamless and efficient coding environment, and we look forward to growing with our user community.
</p>
</div>

<Footer />
