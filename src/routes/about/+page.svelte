<script>
    import Footer from "../../components/Footer.svelte";
import Navbar from "../../components/Navbar.svelte";
</script>

<svelte:head>
  <title>About | Coding Chaska Lab </title>
  <meta property="description" content={`Coding Chaska Lab provides online editor for Python, NodeJs & HTML`} />
</svelte:head>

<Navbar />

<div class="px-4 text-sm breadcrumbs">
  <ul> 
    <li>
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </a>
    </li> 
     
    <li>
      About
    </li>
  </ul>
</div>


<div class="px-4 md:w-5/6 min-h-screen prose max-w-none lg:w-4/6 xl:w-3/6 mx-auto">

    
    
      <br />
      <h1>Coding Chaska Lab</h1>
      <p>
        
        CC Lab, a division of Coding Chaska, offers an online code editor designed for speed and simplicity. Crafted using the efficiency of Svelte and Code Mirror, CC Lab provides a lightweight and agile coding experience. While it's currently in development, your feedback is invaluable to us. If you encounter any issues while using the platform, please don't hesitate to reach out to us at 
        
        <a href="https://www.codingchaska.com/contact">https://www.codingchaska.com/contact </a>. 
        Your input helps us enhance your coding experience.
    </p>

    <p>At present, our platform allows you to code in HTML, Python, NodeJS, Java, and C Programming. We're continuously expanding our offerings and plan to introduce more programming languages in the near future. Stay tuned for even more coding options and opportunities to explore your coding skills!</p>
    <br />
    <br />
</div>

<Footer />