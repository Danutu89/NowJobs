<script>
	import { navigating } from '$app/stores';
	import PageLoader from '$vendor/mase/Spinners/PageLoader.svelte';
	import App from '../App.svelte';
</script>

<App>
	{#if $navigating}
		<PageLoader />
	{:else}
		<slot />
	{/if}
</App>
