<script>
        import { page } from '$app/stores';
        console.log(page);
</script>

<div class="">
    <br />
    <br />
    <div class="text-center">
    <h4>Login is required</h4> 
    <button><a href="/login?nextPage={$page.url.pathname}">Login</a></button>
    </div>
    <br />
    <br />
</div>