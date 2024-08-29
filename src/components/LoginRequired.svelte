<script>
        import { page } from '$app/stores';
        // console.log(page);
</script>


<div class="prose w-full min-h-48 max-w-none bg-base-100 m-auto">
    <br />
    <br />
    <div class="text-center py-16">
    <h2>Login is required</h2> 
    <a href="/login?nextPage={$page.url.pathname}"><button class="btn btn-primary">Click here to login</button></a>
    </div>
    <br />
    <br />
</div>
