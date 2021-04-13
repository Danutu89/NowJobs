<script lang="ts">
	import type { SearchJob } from '$types/search';

	import JobsContainer from './JobsContainer.svelte';
	import SearchNameLocation from './SearchNameLocation.svelte';

	export let filters: SearchJob;
</script>

<main>
	<h1>Find your next job.</h1>
	<div class="search-container">
		<SearchNameLocation location={filters.location} name={filters.name} />
	</div>
	<JobsContainer jobs={new Array(10)} />
</main>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	main {
		display: flex;
		flex-flow: column;
		padding: 0 1rem;
		width: 100%;

		h1 {
			margin-left: 4rem;
		}

		.search-container {
			display: flex;
			background: $background-secondary;
			padding: 1.5rem 0;
			width: calc(100% + 2rem);
			margin-left: -1rem;
		}
	}
</style>
