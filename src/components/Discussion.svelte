<script>
    import { writable } from 'svelte/store';

    import { onMount } from 'svelte';
    let API_URL = import.meta.env.VITE_API_URL;
    import { postDataAuth } from '../utils/auth';
    import Reply from './Reply.svelte';


    export let discuss_on_id;
    export let user;
    let loading = false;
    let loadingMore = false;
    let discussions = [];
    let next = null;

    const getDiscussions = async function(url){
      try{
        loading = true;
        let response = await fetch(url);
        let data = await response.json();
        discussions = [...discussions, ...data.results];
        next = data.next;
        console.log(data);
        }catch(error){
          console.log(error);
        }finally{
          loading = false;
        }
  }

  const loadMore = async () => {
    if (next) {
       try{
        loadingMore = true;
        let response = await fetch(next);
        let data = await response.json();
        discussions = [...discussions, ...data.results];
        next = data.next;
        }catch(error){
          console.log(error);
        }finally{
          loadingMore = false;
        }

    }
  };

    onMount(async () => {
      let url = API_URL + 'discussion/discussions/?ordering=-created&discuss_on=codingproblem&discuss_on_id='+ discuss_on_id;
      discussions = [];
      getDiscussions(url);
      // console.log(data);
    })
  

    // Store to handle input for new discussions and comments
    let newDiscussionTitle = '';
    let newDiscussionContent = '';
  
    // Add a new discussion
    const addDiscussion = () => {
      if (newDiscussionTitle.trim() === '' || newDiscussionContent.trim() === '') return;
      let url = API_URL + 'discussion/discussions/?ordering=-created&discuss_on=codingproblem&discuss_on_id='+ discuss_on_id;

      let data = {
        discuss_on_id: discuss_on_id,
        discuss_on:"codingproblem",
        title: newDiscussionTitle,
        text: newDiscussionContent,
        user_id: user.user.id,
      }
      postDataAuth(url, user.access, data, 'POST').then(data => {
        console.log(data);
        discussions = [];

        getDiscussions(url);
        // discussions = [data, ...discussions];
      }).catch(error => {
        console.log(error);
      })

      newDiscussionTitle = '';
      newDiscussionContent = '';
    };
  
 

  </script>
  
  <!-- Add a New Discussion Section -->
  <div class="container mx-auto p-4 space-y-4">
    <h2 class="text-xl font-bold">Add a New Discussion</h2>
    <div class="space-y-2">
      <input
        type="text"
        placeholder="Discussion title"
        class="input input-bordered input-sm w-full"
        bind:value={newDiscussionTitle}
      />
      <textarea
        placeholder="Discussion content"
        class="textarea textarea-sm textarea-bordered w-full"
        bind:value={newDiscussionContent}
      ></textarea>
      <button class="btn btn-sm btn-primary w-full" on:click={addDiscussion}>
        Add Discussion
      </button>
    </div>
  
    <!-- Discussions List -->
    <h2 class="text-xl font-bold mt-6">Discussions</h2>


    {#each discussions as discussion}
      <div class="card bg-base-200 shadow-md compact mb-4">
        <div class="card-body">
          <!-- Title and Content -->
          <div class="flex items-center mb-2">
            <div class="avatar">
              <div class="w-8 h-8 rounded-full">
                <img src={discussion.user.profile_pic || '/img/user.png'} alt="User avatar" />
              </div>
            </div>
            <span class="ml-2 font-medium">{discussion.user.first_name} {discussion.user.last_name}</span>
          </div>
          <h3 class="font-semibold text-lg">{discussion.title}</h3>
          <p class="text-sm mb-2">{discussion.text}</p>
  
          <Reply user={user} discussion={discussion} />
        </div>
      </div>
    {/each}

    {#if loading}
        <span class="my-2 loading loading-spinner loading-lg"></span>
    {/if}

    {#if (discussions.length == 0 && !loading)}
      <div class="alert alert-info shadow-lg">
          <span>No discussions yet!</span>
      </div>
    {/if}

    {#if next}
    <button class="btn btn-sm btn-secondary w-full mt-4" on:click={loadMore}>
      Load More
    </button>
    {/if}

    {#if loadingMore}
    <span class="my-2 loading loading-spinner loading-lg"></span>
{/if}

  </div>
  