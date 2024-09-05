<script>
    import Navbar from "./../../components/Navbar.svelte";
    import user from "../../stores/auth";
    import { postDataAuth } from "../../utils/auth";
    import Footer from "../../components/Footer.svelte";
    import LoginWrapper from "../../components/LoginWrapper.svelte";
    import { onMount } from "svelte";

    let probelmName;
    let probelmStatement;
    let problemLevel = 'easy';
    let problemId;

    let user1;
    let userInfo;
    
    let submitting = false; // New state for submission in progress
    let problemSubmitted = false;
    let API_URL = import.meta.env.VITE_API_URL;



    user.subscribe((value) => {
        if (value) {
          user1 = JSON.parse(value);
          userInfo = user1.user;  
        }
      });

      function submitTestCase(){
        let url = API_URL+ 'editor/problemtestcases/'
        for (let i = 0; i < testCases.length; i++) {
        postDataAuth(url, user1.access, { problem_id: problemId, name:testCases[i].name, input:testCases[i].input , output:testCases[i].output} ,"POST")
              .then((data3) => {
                problemId = data3.id
                document.getElementById("forms").reset();

              })
              .catch((error) => {
                        console.log(error, "error");
        });
        }
      }

      async function submitForm(){
        submitting = true; // Set submitting to true when form submission starts
        let url = API_URL + 'editor/codingproblems/'

        try {
            const data2 = await postDataAuth(url, user1.access, { creator_id: user1.user.id, name:probelmName, statement:probelmStatement , level:problemLevel , project:''}, "POST");
            problemId = data2.id;
            document.getElementById("forms").reset();
            console.log(problemLevel);
            await submitTestCase();
            problemSubmitted = true; // Set problemSubmitted to true after successful submission
        } catch (error) {
            console.log(error, "error");
        } finally {
            submitting = false; // Set submitting back to false when submission process ends
        }
    }
    
  let testCases = [
    { name: 'test1', input: '', output: '' }
  ];

    function addTestCase() {
      testCases = [...testCases, { name: '', input: '', output: '' }];
    }
    
    function removeTestCase(index) {
      testCases = testCases.filter((_, i) => i !== index);
    }

      // Initialize Quill editor
  let quill;

  onMount(() => {
    // Check if Quill script is already loaded
    if (!window.Quill) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js';
      script.onload = () => {
        quill = new window.Quill('#editor', {
          theme: 'snow'
        });

        // Set up an event listener to update `probelmStatement` when Quill content changes
        quill.on('text-change', () => {
          probelmStatement = quill.root.innerHTML;
        });
      };
      document.head.appendChild(script);
    } else {
      // Quill is already loaded, initialize it directly
      quill = new window.Quill('#editor', {
        theme: 'snow'
      });

      // Set up an event listener to update `probelmStatement` when Quill content changes
      quill.on('text-change', () => {
        probelmStatement = quill.root.innerHTML;
      });
    }
  });


  </script>


<!-- Include Quill's stylesheet -->
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />

<!-- Create the editor container -->
<!-- <div id="editor">
  <p>Hello World!</p>
  <p>Some initial <strong>bold</strong> text</p>
  <p><br /></p>
</div> -->


 <Navbar />




<main class="mx-4">

  <div class="text-sm breadcrumbs">
    <ul>
      <li>
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          Home
        </a>
      </li> 
       
      <li>
        Add your problem
      </li>
    </ul>
  </div>
  <br />
  <LoginWrapper>
  <div class="md:w-1/2 prose max-w-none m-auto">
    {#if problemSubmitted}

    <div class="alert alert-success my-24">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Thank You. Your problem has been submitted. Our team will review & publish it.</span>
  </div>

    {:else}
    <form id="forms">
      <label for="name">Problem Name:</label>
      <input class="w-full mb-4 input input-bordered" type="text" id="name"  required bind:value={probelmName}/>


      <label for="level">Level:</label>
      <select class="select mb-4 select-bordered" id="level" bind:value={problemLevel}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br />
      <label for="statement">Statement:</label > <br />

      <div id="editor"></div>
    
      <!-- <textarea class="textarea textarea-bordered w-full" bind:value={probelmStatement} /> -->
      
      <h3>Test Cases:</h3>
      {#each testCases as testCase, index}
        <div class="flex gap-2 mb-2">
          <input placeholder="name" class="input input-bordered" type="text" id="test-case-name" bind:value={testCase.name} required />
      
          <textarea class="textarea textarea-bordered" placeholder="input for test case" id="test-case-input" bind:value={testCase.input} required></textarea>
      
          <textarea class="textarea textarea-bordered" id="test-case-output" placeholder="output of test case" bind:value={testCase.output} required></textarea>
      
          <button class="btn btn-sm" on:click={() => removeTestCase(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
          <button class="btn btn-sm" on:click={addTestCase}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

        </div>
      {/each}
      
      <hr class="my-4" />

      <button class="btn btn-secondary" type="submit" on:click|preventDefault={submitForm} disabled={submitting}>
        {#if submitting}
            Submitting...
        {:else}
            Add Problem
        {/if}
    </button>

      
    </form>
    {/if}
  </div>

  <br/>
  <br />

  </LoginWrapper>

  
</main>


<Footer />