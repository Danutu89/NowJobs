<script lang="ts">
	import JobsSearch from '$components/JobsSearch.svelte';

	import JobsSidebar from '$components/JobsSidebar.svelte';
	import type { Filters } from '$types/jobs';
	import MediaQuery from '$vendor/mase/utils/MediaQuery.svelte';

	let filters = {} as Filters;
</script>

<main>
	<MediaQuery query="(min-width: 860px)" let:matches>
		{#if matches}
			<JobsSidebar {filters} />
		{/if}
	</MediaQuery>
	<JobsSearch {filters} />
</main>

<style lang="scss">
	main {
		display: flex;
		flex-flow: row;

		@media screen and (max-width: 860px) {
			flex-flow: column;
			width: calc(100% - 1rem);
		}
	}
</style>
