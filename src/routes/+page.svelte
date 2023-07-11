
<script>
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<Navbar />
<div class="container">

    <div class="hero min-h-screen">
        <div class="hero-content p-0 pt-10 pb-10 flex-col lg:flex-row-reverse">

            <div class="flex-1">
            <img src="/home.jpg" alt="Coding Chaska Lab" />
            </div>
          <div class="flex-1">
            <h1 class="text-5xl font-bold">Write Code Online</h1>
            <p class="py-6">Write code online without installing anything on your system.</p>
           <a href="/write-code-online"><button class="btn btn-primary">Get Started</button></a>
          </div>
        </div>
      </div>

      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-xl">
            <br />
            <h1 class="text-5xl font-bold">Coding Problems</h1>
            <p class="py-6">
                Solving coding problems is an essential skill for any programmer.
                It helps to develop logical thinking, creativity, and problem-solving abilities. 
                By solving coding problems regularly, programmers can become more confident and proficient in their chosen programming language and domain.
            </p>
            <a href="/coding-problems"><button class="btn btn-primary">Solve Now</button></a> 
          </div>
        </div>
    </div>

</div>

<Footer />