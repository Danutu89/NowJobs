<script lang="ts">
	import { getJobs } from '$actions/jobs';

	import { jobsInterceptor } from '$interceptors/jobs';
	import { jobsReducer } from '$reducers/jobs';
	import { jobsStore } from '$stores/jobs';
	import type { Filters } from '$types/jobs';
	import MediaQuery from '$vendor/mase/utils/MediaQuery.svelte';

	import { createSlicer, dispatch } from '$vendor/sedux';
	import { onMount } from 'svelte';

	import JobsContainer from './JobsContainer.svelte';
	import JobsSidebar from './JobsSidebar.svelte';
	import SearchNameLocation from './SearchNameLocation.svelte';

	export let filters: Filters;

	let opened = false;

	const handleChange = (): void => {
		dispatch(() => getJobs(filters, 'jobs'));
	};

	const handleToggleSidebar = (): void => {
		opened = !opened;
	};

	onMount(() => {
		createSlicer(jobsInterceptor, jobsReducer, 'jobs', jobsStore);

		dispatch(() => getJobs(filters, 'jobs'));
	});
</script>

<main>
	<h1>Find your next job.</h1>
	<div class="search-container">
		<SearchNameLocation
			bind:location={filters.location}
			bind:name={filters.search}
			on:change={handleChange}
			on:toggleSidebar={handleToggleSidebar}
		/>
		<MediaQuery query="(max-width: 860px)" let:matches>
			{#if matches}
				<JobsSidebar {filters} {opened} />
			{/if}
		</MediaQuery>
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

		@media screen and (max-width: 860px) {
			width: calc(100% - 1rem);
			flex-flow: column;
		}

		h1 {
			margin-left: 4rem;

			@media screen and (max-width: 860px) {
				max-width: calc(100% - 1rem);
				margin-left: 1rem;
			}
		}

		.search-container {
			display: flex;

			background: $background-secondary;
			padding: 1.5rem 0;
			width: calc(100% + 2rem);
			margin-left: -1rem;

			@media screen and (max-width: 860px) {
				margin-left: -1rem;
				width: calc(100% + 2rem);
				flex-flow: column;
			}
		}
	}
</style>
