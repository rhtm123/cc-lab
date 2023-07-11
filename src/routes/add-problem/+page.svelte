<script>
    import Navbar from "./../../components/Navbar.svelte";
    // import Editor from '@tinymce/tinymce-svelte'
    import user from "../../stores/auth";
    import { postDataAuth } from "../../utils/auth";
    import Footer from "../../components/Footer.svelte";
    import LoginRequired from "../../components/LoginRequired.svelte";
    let probelmName;
    let probelmStatement;
    let problemLevel = 'easy';
    let problemId;

    let user1;
    let userInfo;

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

  function submitForm(){
  let url = API_URL + 'editor/codingproblems/'

  postDataAuth(url, user1.access, { creator_id: user1.user.id, name:probelmName, statement:probelmStatement , level:problemLevel , project:''}, "POST")
              .then((data2) => {
                problemId = data2.id
                document.getElementById("forms").reset();
                console.log(problemLevel)
                submitTestCase()

              })
              .catch((error) => {
                console.log(error, "error");
});

  }

    
  let testCases = [
    { name: 'testcase1', input: '', output: '' }
  ];

    function addTestCase() {
      testCases = [...testCases, { name: '', input: '', output: '' }];
    }
    
    function removeTestCase(index) {
      testCases = testCases.filter((_, i) => i !== index);
    }

   
  </script>
  

 <Navbar />

<main class="container">

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
  {#if user1}
  <div class="md:w-3/4 prose max-w-none m-auto">
    {#if problemSubmitted}

    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Thank You. You problem has been submitted. Our team will review & publish it.</span>
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
    
      <textarea class="textarea textarea-bordered w-full" bind:value={probelmStatement} />

      <hr />
      
      <h3>Test Cases:</h3>
      {#each testCases as testCase, index}
          <div class="flex gap-2 mb-4">
          <input placeholder="name" class="input input-bordered" type="text" id="test-case-name" bind:value={testCase.name} required />
      
          <textarea class="textarea textarea-bordered" placeholder="input for test case" id="test-case-input" bind:value={testCase.input} required></textarea>
      
          <textarea class="textarea textarea-bordered" id="test-case-output" placeholder="output of test case" bind:value={testCase.output} required></textarea>
      
          <button class="btn" on:click={() => removeTestCase(index)}>Remove</button>
          <button class="btn" on:click={addTestCase}>Add New</button>

        </div>
      {/each}
      
      <hr />
      
      <button class="btn btn-secondary" type="submit" on:click={submitForm}>Add Problem</button>
    </form>
    {/if}
  </div>
  {:else}
  <LoginRequired />
  {/if}
  
</main>


<Footer />