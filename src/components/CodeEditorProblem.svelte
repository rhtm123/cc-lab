
<script>
// @ts-nocheck

let user1;
let projectcode; // 
let value = ""
export let projectdata;
let API_URL = import.meta.env.VITE_API_URL;
let is_owner;

import user from "../stores/auth";
import { postDataAuth } from "../utils/auth";
import PythonEditor from "./Editors/PythonEditor.svelte";
import { activeFile } from "../stores/activeFile";


// console.log(projectdata);
  user.subscribe((value) => {
    if (value) {
    user1 = JSON.parse(value);
    is_owner = user1.user.id === projectdata.creator;
      
    }
  })

  // console.log(projectdata);
  activeFile.subscribe((value1) => {
    if (value1) {
      projectcode = value1;
    }
  })

  let url = API_URL + "editor/projectcodes/?project=" + projectdata.id;
  fetch(url)
    .then(async (response) => {
      if (response.ok) {
        let data1 = await response.json();
        projectcode = data1["results"][0];
        activeFile.update(() => projectcode);
        // console.log(projectcode);
        value = projectcode.code;
      } else {
      }
    })
    .catch((error) => {});


    
  // saving to database if typing is stopped for few seconds; 
$: saveToDatabase(value);

$: saveToActiveFile(value);

function saveToActiveFile(...args) {
  if (projectcode){
    projectcode.code = value;
    activeFile.update(() => projectcode);
  }
}

let timeout1;

function saveToDatabase(...args) {

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

</script>

<PythonEditor bind:value height="100%" />
