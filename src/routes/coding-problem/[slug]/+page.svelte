




<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import ThemeChange from '../../../components/ThemeChange.svelte';
    // import Check from '../../../components/svg/Check.svelte';

// @ts-nocheck

// @ts-nocheck

    import LoginRequired from '../../../components/LoginRequired.svelte';
    import user from '../../../stores/auth';
    import { postDataAuth,postData } from '../../../utils/auth';



  import { Splitpanes, Pane } from 'svelte-splitpanes';

  import { activeFile } from '../../../stores/activeFile';


    /**
     * @type {any}
     */
    /**
     * @type {{ accepted?: any; project?: any; id?: any; success?: boolean; }}
     */
    let user_problem;
    let API_URL = import.meta.env.VITE_API_URL;


    let loading = true;


    /** @type {import('./$types').PageData} */
    export let data;


    let test_cases = [];


    /**
     * @type {{ access: string | undefined; user: { id: any; }; }}
     */
    let user1; 

    user.subscribe(value => {
        if (value) user1 = JSON.parse(value);
        loading = false;
	});

  let projectcode;

  activeFile.subscribe((value1) => {
    if (value1) {
      projectcode = value1;
    }
  })


    onMount(()=>{
      let url = API_URL + `editor/problemtestcases/?problem=`+data.id;
      fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            test_cases = data1.results;
            console.log(test_cases);
           }
        }).catch(error=>{  })
    })
      
    const createUserProblem = () => {
    // console.log("Creating userproblem")
    let url = API_URL + 'editor/userproblems/';
    postDataAuth(url,user1.access,{"user_id":user1.user.id, problem_id:data.id,})
          .then(data1 => {
            user_problem = data1;
          }).catch(error => {
            console.log(error)
        })
  }


  onMount(()=>{
    if(user1){
    let url = API_URL+`editor/userproblems/?user=${user1.user.id}&problem=${data.id}&project=`;
    fetch(url)
      .then(async (response) => {
        if (response.ok) {
          var data1 = await response.json();
          // console.log(data1)
          if (data1.count>0){

            user_problem = data1.results[0];
            // console.log(user_problem);
            if (user_problem.accepted===true) problem_solved = true
          } else {
            createUserProblem();
          } 
         } 
      }).catch(error=>{  })
    }
  })

  /**
     * @type {any[]}
     */
  let test_results=[];
  let all_test_passed=true;
  let test_complete = false;
  let show_modal = false;
  let problem_solved = false;
  // let value = "" ;


  const testCodefunc = async () => {
        test_results = []
        test_complete = false;
        all_test_passed = true
        show_modal = true
        // let url = 'https://'+data.project.container_name+'.thelearningsetu.com/run_python_code/'
        // console.log(url);
        let url = import.meta.env.VITE_CODE_URL;
        // let url2 = API_URL+"editor/projectcodes/?project="+user_problem.project.id;

              
              
        for (let test_case of test_cases){
          // console.log(test_case);
          let inputs = test_case.input;
          let assert_code = test_case.assert_code?test_case.assert_code:"";
          // console.log(typeof code, typeof inputs, typeof assert_code);
        
        await postData(url, {code:projectcode.code, inputs:inputs, assert_code:assert_code})
        .then(data => {
          // console.log(data)
          if(test_case.type==="inputoutput"){
            let correctout = test_case.output.replace(/\s+/g, ' ').trim();
            let yourout = data.output.replace(/\s+/g, ' ').trim();
            let pass = correctout==yourout;
            if (correctout!=yourout){
              if (all_test_passed) {all_test_passed =false}
            }
            let a = {"result":data, "test":test_case, "pass":pass}
            test_results = [...test_results, a];

          } else if (test_case.type==="assert"){
            // console.log("assert");
            // console.log(data);
            let pass = !data.error;
            // console.log(pass);
            if (data.error){
              if (all_test_passed) {all_test_passed =false}
            }
            let a = {"result":data, "test":test_case, "pass":pass}
            test_results = [...test_results, a];
          }
      }).catch(error => {
          console.log(error);
      })
        }


      test_complete = true 


          

        
}

const submitCode = () => {
      // e.preventDefault();
      let problemID = user_problem.id;
      show_modal = false;
      let url = API_URL + `editor/userproblem/`+problemID+'/';
      postDataAuth(url, user1.access, {submitted: true, accepted:true}, "PATCH")
        .then(data => {
          console.log(data);
          problem_solved = true;
            
      }).catch(error => {
          console.log(error);
      })
  }

  const unSubmit = () => {
      // e.preventDefault();
      problem_solved = false
      show_modal = true;
      let problemID = user_problem.id;
      let url = API_URL + `editor/userproblem/`+problemID+'/';
      postDataAuth(url, user1.access, {submitted: false, accepted:false}, "PATCH")
        .then(data => {

      }).catch(error => {
          // console.log(error);
      })
    }

    import CodeEditorProblem from '../../../components/CodeEditorProblem.svelte';



</script>




<svelte:head>
  <title>{data.name} | Coding Chaska Lab </title>
  <meta property="description" content={`Solve Coding Problem Online Python Editor`} />
</svelte:head>





<div class="flex flex-col h-screen overflow-hidden">
  <div class="sm:block bg-base-200" style="border-bottom:1.2px solid grey">
    <div class="text-sm flex justify-between breadcrumbs px-2">
      <ul>
        <li>
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            
          </a>
        </li> 
         
        <li>
          <a href="/coding-problems">
            Problems            
          </a>
        </li> 
        
      </ul>

      <ul>
        <!-- <button onclick="my_modal_1.showModal()" class="btn btn-primary py-3 min-h-0 h-auto">Check</button> -->

        {#if (!problem_solved && user1)}
        <label on:click={testCodefunc} class="btn btn-primary btn-sm" onclick="my_modal_1.showModal()">Check</label>
        {/if}
        <dialog id="my_modal_1" class="modal prose">
                  <form method="dialog" class="modal-box">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    
                    <h4 class="text-xl">Test Results</h4>
              {#if test_complete}
                  <p>Test Completed</p>
              {:else}
                <p>Testing your code..</p>
              {/if}

              {#each test_results as test_result, index}
                <p class="font-medium">{index+1}. {test_result.test.name}

                  {#if test_result.pass}
                  <span class="text-success">Success</span>

                {:else}
                  <span class="text-error">Failed</span>
                {/if}
                
                </p>
                

                  {#if test_result.result.error} 
                  <p class="text-error">
                    {test_result.result.errorText}
                  </p>
                  {/if}

                  {#if test_result.test.type==="inputoutput"}

                  <div>

                    <span>Input:</span>
                      <pre class="my-2 " >{test_result.test.input}</pre>
                      <span>Expected Output:</span>
                      <pre class="my-2">{test_result.test.output}</pre>
                      <span>Your Output:</span>
                      <pre class="my-2">{test_result.result.output}</pre>
                    </div>
                  {/if}
              {/each}

              {#if (test_complete && all_test_passed)}
                    <button class="btn btn-primary my-4" for="modal-1" on:click={submitCode}>Submit Code</button>
              {/if}                    
                  </form>
                  <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

      </ul>
      <ul>
        <li>
          <ThemeChange />
        </li>
      </ul>
    </div>
  </div>
    
    <Splitpanes class="h-full">

      <Pane minSize={15} size={50}>

        <div class="bg-base-100 overflow-y-auto prose max-w-none p-2" style="height: calc(100% - 40px);">
        <h2 class="mt-6">{data.name}</h2>
            <div>{@html data.statement}</div>

          </div>
      </Pane>
  
      <Pane minSize={20} size={60} class="h-full">
        
        <Splitpanes horizontal={true}>
          <Pane minSize={15} size={50}>

            {#if user1}
            <div class="h-full bg-base-100">

              {#if problem_solved}

              <div class="p-2">

                <p class="py-4">You have solved this problem.</p>
                <a href="/coding-problems"><button class="btn btn-secondary">Solve More Problems</button></a>
                <button class="btn btn-secondary" on:click={unSubmit}>Solve it Again</button>

              </div>

              {:else}

                {#if user_problem}
                <CodeEditorProblem projectdata={user_problem.project} />
                {/if}
              {/if}
            </div>

            {:else}
              <div class="h-full bg-base-100">
              <LoginRequired />
              </div>
            {/if}



          </Pane>
          <Pane >

            <div class=" bg-base-100 overflow-y-auto prose max-w-none p-2" style="height: calc(100% - 40px);">
              <h3 class="text-bold">TEST CASES</h3>

              {#each test_cases as test_case, index}
                <span class="font-bold">{index+1}. {test_case.name} </span>

                <div class="card">
                   {#if test_case.type == "inputoutput"}
                      <span>Input:</span>
                      <pre class="my-2 " >{test_case.input}</pre>
                      <span>Expected Output:</span>
                      <pre class="my-2">{test_case.output}</pre>

                   {/if}

                   {#if test_case.type == "assert"}

                    <pre class="my-2">{test_case.assert_code}</pre>


                   {/if}
                </div>

              {/each}

                  
      
              </div>
            
          </Pane>
        </Splitpanes>
        
      </Pane>


    </Splitpanes>
  
</div>




  <!-- <div class="tabs">
    <button on:click={()=>{activeTab="problem"}} class={activeTab=="problem"?"tab tab-bordered tab-lg tab-active":"tab tab-lg tab-bordered"}>Problem</button> 
    <button on:click={()=>{activeTab="solve"}} class={activeTab=="solve"?"tab tab-bordered tab-lg tab-active":"tab tab-lg tab-bordered"}>Solve it</button> 
  </div>
           -->
  <!-- <div class="prose max-w-none m-auto">
        {#if activeTab==="problem"}
            <h2 class="mt-6">{data.name}</h2>
            <div>{@html data.statement}</div>

        {:else}
            {#if user1}

              {#if problem_solved}

              <p class="pt-8">You have solved this problem.</p>
              <a href="/coding-problems"><button class="btn btn-secondary">Solve More Problems</button></a>
              <button class="btn btn-secondary" on:click={unSubmit}>Solve it Again</button>

              {:else}

              <div class="flex justify-end mb-2">
                <label on:click={testCodefunc} class="btn btn-primary btn-sm" onclick="my_modal_1.showModal()">Check</label>

                <dialog id="my_modal_1" class="modal">
                  <form method="dialog" class="modal-box">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    
                    <h4 class="text-xl">Test Results</h4>
              {#if test_complete}
                  <p>Test Completed</p>
              {:else}
                <p>Testing your code..</p>
              {/if}

              {#each test_results as test_result}
                <p>{test_result.test.name}

                  {#if test_result.pass}
                  <span class="text-success">Passed</span>
                {:else}
                  <span class="text-error">Failed</span>
                {/if}
                
                </p>
                

                  {#if test_result.result.error} 
                  <p>
                    {test_result.result.errorText}
                  </p>
                  {/if}

                  {#if test_result.test.type==="inputoutput"}

                  <div>
                    <p>Sample Input: {test_result.test.input}</p>
                    <p>Expected Output: {test_result.test.output}</p>
                    <p>Your Output: {test_result.result.output}</p>
                    </div>
                  {/if}
              {/each}

              {#if (test_complete && all_test_passed)}
                    <button class="btn btn-primary" for="modal-1" on:click={submitCode}>Submit Code</button>
              {/if}                    
                  </form>
                  <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>

              {#if user_problem}
              <div class="not-prose">
              <CodeEditor projectdata={user_problem.project} />
              </div>
              {/if}

              {/if}
              


            {:else}
            <LoginRequired />
            {/if}
        {/if}

  </div>    -->





<!-- <Footer /> -->




<style>
  :global(.codemirror-wrapper) {
      height: 100%;
  }
</style>