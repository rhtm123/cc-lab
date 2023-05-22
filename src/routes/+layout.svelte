<script>
    import '../global.css';
    import 'aos/dist/aos.css';
    // import ThemeChange from '../components/ThemeChange.svelte';
    // import Logo from '$lib/images/logo.png';
    import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
    import { onMount } from 'svelte';
	import 'nprogress/nprogress.css';
    import AOS from 'aos';

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	onMount(() => {
		AOS.init();
	});
  
</script>

<!-- navbar -->



<slot />
<!-- footer -->

<!-- <ThemeChange /> -->

<!-- <div>
  <p style="text-align:center; font-weight:400; padding:1rem">@Coding Chaska v0.0.1 </p>
</div> -->

