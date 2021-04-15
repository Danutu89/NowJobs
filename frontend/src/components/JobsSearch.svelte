<script lang="ts">
	import { getJobs } from '$actions/jobs';

	import { jobsInterceptor } from '$interceptors/jobs';
	import { jobsReducer } from '$reducers/jobs';
	import { jobsStore } from '$stores/jobs';

	import type { SearchJob } from '$types/search';
	import { addReducerAndInterceptors, dispatch } from '$vendor/sedux';
	import { onMount } from 'svelte';

	import JobsContainer from './JobsContainer.svelte';
	import SearchNameLocation from './SearchNameLocation.svelte';

	export let filters: SearchJob;

	onMount(() => {
		addReducerAndInterceptors(jobsInterceptor, jobsReducer, 'jobs', jobsStore);

		dispatch(() => getJobs('jobs'));
	});
</script>

<main>
	<h1>Find your next job.</h1>
	<div class="search-container">
		<SearchNameLocation location={filters.location} name={filters.name} />
	</div>
	<JobsContainer {...$jobsStore.jobs} />
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
