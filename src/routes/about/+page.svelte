<script>
    import Footer from "../../components/Footer.svelte";
import Navbar from "../../components/Navbar.svelte";
</script>

<svelte:head>
  <title>About | Coding Chaska Lab </title>
  <meta property="description" content={`Coding Chaska Lab provides online editor for Python, NodeJs & HTML`} />
</svelte:head>

<Navbar />


<div class="container">

    
    
    <div class="text-sm breadcrumbs">
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

      <br />
   
      <p>
        CC Lab is part of Coding Chaska. CC Lab is an online editor. It is a lightweight and fast editor. 
        It is made with Svelte and Code Mirror. Currently, it is in the development phase. 
        If you have any problems with the website, please let us know at 
        <a href="https://www.codingchaska.com/contact">https://www.codingchaska.com/contact </a>
    </p>
    <br />
    <br />
</div>

<Footer />