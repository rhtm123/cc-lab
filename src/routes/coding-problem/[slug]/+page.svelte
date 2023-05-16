<script>
    import { onMount } from 'svelte';

// @ts-nocheck

    import CodeEditor from '../../../components/CodeEditor.svelte';
// @ts-nocheck

    import LoginRequired from '../../../components/LoginRequired.svelte';
    import Navbar from '../../../components/Navbar.svelte';
    import user from '../../../stores/auth';
    import { postDataAuth,postData } from '../../../utils/auth';

    /**
     * @type {any}
     */
    let test_cases;
    /**
     * @type {{ accepted?: any; project?: any; id?: any; success?: boolean; }}
     */
    let user_problem;
    let API_URL = import.meta.env.VITE_API_URL;

    // let API_URL = "https://codingchaska.up.railway.app/api/v1/"


    /** @type {import('./$types').PageData} */
    export let data;
    let activeTab="problem";

    /**
     * @type {{ access: string | undefined; user: { id: any; }; }}
     */
    let user1; 

    user.subscribe(value => {
        if (value) user1 = JSON.parse(value);
	});


    onMount(()=>{
      let url = API_URL + `editor/problemtestcases/?problem=`+data.id;
      fetch(url)
        .then(async (response) => {
          if (response.ok) {
            let data1 = await response.json();
            test_cases = data1.results;
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
            if (user_problem.accepted===true) problem_solved = true
          } else {
            createUserProblem()
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


  const testCodefunc = async () => {
        test_results = []
        test_complete = false;
        all_test_passed = true
        show_modal = true
        // let url = 'https://'+data.project.container_name+'.thelearningsetu.com/run_python_code/'
        // console.log(url);
        let url = "https://web-production-241c.up.railway.app/run_python_code/";
        let url2 = "https://codingchaska.up.railway.app/api/v1/editor/projectcodes/?project="+user_problem.project.id;
        fetch(url2)
            .then(async (response) => {
              if (response.ok) {
                let data2 = await response.json()
                let code = String(data2['results'][0].code);
                // console.log(code);
              
        for (let test_case of test_cases){
          // console.log(test_case);
          let inputs = test_case.input;
          let assert_code = test_case.assert_code?test_case.assert_code:"";
          // console.log(typeof code, typeof inputs, typeof assert_code);
        
        await postData(url, {code:code, inputs:inputs, assert_code:assert_code})
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
      })
        
}

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




</script>

<Navbar />
<ul class="breadcrumb">
    <li><a href="/">Home</a></li>
    <li><a href="/coding-problems">Coding Problems</a></li>
    <li>{data.name}</li>
</ul>


<input class="modal-state" id="modal-1" type="checkbox">
          <div class="modal" style={!show_modal?"display:none":""}>
            <div class="modal-body" style="min-width: 40%;">
              <label class="btn-close" for="modal-1">X</label>
              <h4 class="modal-title">Test Results</h4>
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
                  <span class="text-danger">Failed</span>
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
                    <button for="modal-1" on:click={submitCode}>Submit Code</button>
              {/if}
            </div>
    </div>


<div class="section padding">
            <div class="tabs">
                <button on:click={()=>{activeTab="problem"}} class={activeTab=="problem"?"btn-primary":""}>Problem</button>

                <button on:click={()=>{activeTab="solve"}} class={activeTab=="solve"?"btn-primary":""}>Solve</button>
            </div>
    
        {#if activeTab==="problem"}
            <h2 class="header">{data.name}</h2>
            <div>{@html data.statement}</div>

        {:else}
            {#if user1}

              {#if problem_solved}

              <p>You have solved this problem.</p>
              <button><a href="/coding-problems">Solve More Problems</a></button>
              <button on:click={unSubmit}>Solve it Again</button>

              {:else}

              <div class="row flex-right margin-top">
                <label on:click={testCodefunc} class="paper-btn" for="modal-1">Check</label>
  
              </div>
              {#if user_problem}
              <CodeEditor projectdata={user_problem.project} />
              {/if}

              {/if}
              


            {:else}
            <LoginRequired />
            {/if}
        {/if}

        

</div>