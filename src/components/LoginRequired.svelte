<script>
        import { page } from '$app/stores';
        // console.log(page);
</script>


<div class="prose w-full max-w-none m-auto">
    <br />
    <br />
    <div class="text-center">
    <h2>Login is required</h2> 
    <a href="/login?nextPage={$page.url.pathname}"><button class="btn btn-primary">Login</button></a>
    </div>
    <br />
    <br />
</div>
