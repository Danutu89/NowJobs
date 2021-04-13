<script lang="ts">
	import JobsPromoted from '$components/JobsPromoted.svelte';

	import JobsSearch from '$components/JobsSearch.svelte';

	import JobsSidebar from '$components/JobsSidebar.svelte';
	import type { SearchJob } from '$types/search';

	let filters = {
		name: '',
		location: -1,
		company: -1,
		domain: -1
	} as SearchJob;
</script>

<main>
	<JobsSidebar {filters} />
	<JobsSearch {filters} />
</main>

<style lang="scss">
	main {
		display: flex;
		flex-flow: row;
	}
</style>
