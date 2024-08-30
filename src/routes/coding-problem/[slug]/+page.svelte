




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

  // import CodeEditorProblem from '../../../components/CodeEditorProblem.svelte';
  import { writable } from 'svelte/store';
  import PythonEditor from "../../../components/Editors/PythonEditor.svelte"


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
  let projectdata;
  let value = ""


  function projectCodes() {
    let url = API_URL + "editor/projectcodes/?project=" + projectdata.id;
    fetch(url)
      .then(async (response) => {
        if (response.ok) {
          let data1 = await response.json();
          projectcode = data1["results"][0];

          value = projectcode.code;
        } else {
        }
      })
      .catch((error) => {});
  }
    

    onMount(()=>{
      let url = API_URL + `editor/problemtestcases/?problem=`+data.id;
      fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            test_cases = data1.results;
            // console.log(test_cases);
           }
        }).catch(error=>{  })
    })
      
    const createUserProblem = () => {
    // console.log("Creating userproblem")
    let url = API_URL + 'editor/userproblems/';
    postDataAuth(url,user1.access,{"user_id":user1.user.id, problem_id:data.id,})
          .then(data1 => {
            user_problem = data1;
            projectdata = user_problem.project;
            projectCodes(); 

            // console.log(projectdata);
            
          }).catch(error => {
            // console.log(error)
        })
  }


  $: saveToDatabase(value);

  let timeout1;
  function saveToDatabase(...args) {
    // console.log(value)

  clearTimeout(timeout1);
    // console.log("stored to database");
    setTimeout(() => {
      try {
        let url = API_URL + `editor/projectcode/${projectcode.id}/`;
        // console.log(projectdata);
        let creatorID = projectdata.creator.id
          ? projectdata.creator.id
          : projectdata.creator;
        if (user1.user.id === creatorID) {
          postDataAuth(url, user1.access, { code: value }, "PATCH")
            .then((data2) => {
              // console.log("saved")
            })
            .catch((error) => {
              // console.log(error, "error");
            });
        }
      } catch (e) {}
    }, 1200);

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
            projectdata = user_problem.project;
            projectCodes(); 

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

const submitCode = () => {
      // e.preventDefault();
      let problemID = user_problem.id;
      show_modal = false;
      let url = API_URL + `editor/userproblem/`+problemID+'/';
      postDataAuth(url, user1.access, {submitted: true, accepted:true}, "PATCH")
        .then(data => {
          // console.log(data);
          problem_solved = true;
            
      }).catch(error => {
          // console.log(error);
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


    let activeTab = "testcase";

    function changeActiveTab(tabvalue) {
      activeTab = tabvalue;
    }


  async function handleFunctionEvent(event) {
    activeTab = "output";
    let runFunction = event.detail.runFunction;
    let d = await runFunction();
    // console.log("Hello", d);
    logs.update(current => [...current, d]);
  }

  async function  handleTestCase(event) { 
      let runFunction = event.detail.runFunction;
    
      test_results = []
      test_complete = false;
      all_test_passed = true
      show_modal = true
      // console.log(show_modal);

      document.getElementById("my_modal_1").show();

      let data;
            
      for (let test_case of test_cases){
        // console.log(test_case);
        let inputs = test_case.input;
        let assert_code = test_case.assert_code?test_case.assert_code:"";
        console.log("test starting: ")
        data = await runFunction(inputs, assert_code);
        console.log("outcome is ===", data);
        
        try {
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

            let pass = !data.error;
            if (data.error){
              if (all_test_passed) {all_test_passed =false}
            }
            let a = {"result":data, "test":test_case, "pass":pass}
            test_results = [...test_results, a];
        }
        } catch (e) { 
          console.log("ERRROR:", e)
        }
      }
      // console.log(test_results);
      test_complete = true 

  }


  const logs = writable([{"error":false,"output":"Welcome to python editor!"}]);


    // const originalConsoleLog = console.log;
    // console.log = (...args) => {
    //     logs.update(currentLogs => [...currentLogs, args.join(' ')]);
    //     originalConsoleLog.apply(console, args);
    // };


</script>



<svelte:head>
  <title>{data.name} | Coding Chaska Lab</title>
  <meta name="description" content={`Solve coding problems online with Python editor at Coding Chaska Lab`} />
  <meta name="keywords" content="coding problems, online editor, Python, coding practice, Coding Chaska Lab" />
  <meta property="og:title" content="{data.name} | Coding Chaska Lab" />
  <meta property="og:description" content={`Solve coding problems online with Python editor at Coding Chaska Lab`} />
  <!-- <meta property="og:image" content= /> -->
  <meta property="og:url" content={"https://www.codingchaskalab.com/coding-problem/"+data.slug} />
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
        <h2 class="">{data.name}</h2>
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
                  <PythonEditor on:functionTestEvent={handleTestCase} on:functionEvent={handleFunctionEvent} bind:value height="100%" project_type={"problem"} />

                <!-- <CodeEditorProblem projectdata={user_problem.project} /> -->
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

              {#if activeTab=="testcase"}
                <button class="btn btn-sm btn-success">Test cases</button>
                <button class="btn btn-sm " on:click={()=>changeActiveTab("output")}>Output</button>
                <div class="py-2">
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

              {:else}
                <div class="min-h-screen">

                  <div class="flex justify-between">
                  <div>
                  <button class="btn btn-sm" on:click={()=>changeActiveTab("testcase")}>Test cases</button>
                  <button class="btn btn-sm btn-success">Output</button>
                </div>
                <button on:click={()=> logs.update(current => [])} class="btn btn-sm btn-primary btn-outline">CLEAR</button>
                </div>
  
                <div class="px-1 py-2 not-prose font-mono">
                      {#each $logs as log}
                          {#if !log.error}
                          <pre class="text-sm text-success">> {log.output}</pre>
                          {:else}
                          <pre class="text-sm text-error">> {log.output}</pre>
                          {/if}
                      {/each}
                </div>

                </div>

              {/if}


                  
      
              </div>
            
          </Pane>
        </Splitpanes>
        
      </Pane>


    </Splitpanes>
  
</div>



<style>
  :global(.codemirror-wrapper) {
      height: 100%;
  }
</style>