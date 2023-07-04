<script>
    import Navbar from "./../../components/Navbar.svelte";
    import Editor from '@tinymce/tinymce-svelte'
    import user from "../../stores/auth";
    import { postDataAuth } from "../../utils/auth";
    import { writable } from 'svelte/store';
    let probelmName;
    let probelmStatement;
    let problemLevel = 'easy';
    let problemId

    let user1 = writable();
    let userInfo = writable();
    user.subscribe((value) => {
        if (value) {
          user1 = JSON.parse(value);
          userInfo = user1.user
          
        }
      });

      function submitTestCase(){
        let url = 'https://cc-dev.up.railway.app/api/v1/editor/problemtestcases/'
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
  let url = 'https://cc-dev.up.railway.app/api/v1/editor/codingproblems/'

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


    let apiKey = "57uq22dj8wgzh3n9989668cmek929nyrzj4dq0rs40funcv6";
    let conf = {
  "height": 500,
  "plugins": [
      "autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","fullscreen","insertdatetime","media","table","help","wordcount"
    ],
   "toolbar": "undo redo |casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist checklist outdent indent | removeformat | code table "
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

   <form id="forms">
     <label for="name">Problem Name:</label>
    <input type="text" id="name"  required bind:value={probelmName}/>
    
    <label for="creator">Creator:</label>
    <input type="text" id="creator" required value={`${userInfo.firstname} ${userInfo.lastname}`} readonly>
    
    <label for="statement">Statement:</label >
    <Editor
    id="statement"
   {apiKey}
   {conf}
   bind:value={probelmStatement}
    />

    
    <label for="level">Level:</label>
    <select id="level" bind:value={problemLevel}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    
    <h3>Test Cases:</h3>
    {#each testCases as testCase, index}
      <div class="test-case">
        <label for="test-case-name">Name:</label>
        <input type="text" id="test-case-name" bind:value={testCase.name} required />
    
        <label for="test-case-input">Input:</label>
        <textarea placeholder="input for test case" id="test-case-input" bind:value={testCase.input} required></textarea>
    
        <label for="test-case-output">Output:</label>
        <textarea id="test-case-output" placeholder="output of test case" bind:value={testCase.output} required></textarea>
    
        <button on:click={() => removeTestCase(index)}>Remove</button>
      </div>
    {/each}
    
    <button on:click={addTestCase}>Add Test Case</button>
    
    <button type="submit" on:click={submitForm}>Submit</button>
  </form>
  
    </main>