
<script>
    export let discussion;
    export let user;
    import { onMount } from "svelte";
  import { postDataAuth } from "../utils/auth";
  let API_URL = import.meta.env.VITE_API_URL;


    let submitting = false;


    let replies = [];

    onMount(async () => {
        const res = await fetch(API_URL+`discussion/discussions/?discuss_on=codingproblem&discuss_on_id=&discussion_nested=`+discussion.id);
        const data = await res.json();
        // console.log(data);
        replies = data.results;
        replies = [...replies, ...data.results];
        
        // console.log(replies);
    })

    let newReply = '';

    const addReply = async () => {
        try {
            submitting = true;
        let data = await postDataAuth( API_URL + 'discussion/discussions/', user.access , {
            discuss_on: 'codingproblem',
            user_id: user.user.id,
            // discuss_on_id: discussion.id,
            discussion_nested_id: discussion.id,
            text: newReply,
        }, "POST")
        // console.log(data);
        // replies.push(data);
        replies = [...replies, data];
        newReply = '';

        } catch (error) {
            console.log(error)
        } finally {
            submitting = false;
        }
    }

</script>

<h3 class="font-bold mb-2">Replies</h3>
{#each replies as reply}
    <div class="card bg-base-200 shadow-md compact mb-4">
        <div class="card-body">
            <div class="flex items-center mb-2">
                <div class="avatar">
                  <div class="w-8 h-8 rounded-full">
                    <img src={discussion.user.profile_pic || '/img/user.png'} alt="User avatar" />
                  </div>
                </div>
                <span class="ml-2 font-medium">{discussion.user.first_name} {discussion.user.last_name}</span>
              </div>

            <p>{reply.text}</p>
        </div>
    </div>
{/each}

{#if replies.length == 0}
    <div class="card bg-base-200 shadow-md compact mb-4">
        <div class="card-body">
            <p>No replies yet!</p>
        </div>
    </div>
{/if}


    <div class="flex items-center">
    <input
      type="text"
      placeholder="Add a reply..."
      class="input input-sm input-bordered flex-grow"
      bind:value={newReply}
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          addReply();
        }
      }}
    />
    
    {#if submitting}
        <span class="loading loading-spinner loading-sm ml-2"></span>
    {:else}
    <button
      class="btn btn-xs btn-success ml-2"
      on:click={() => addReply()}
    >
      Reply
    </button>
    {/if}
  </div>

