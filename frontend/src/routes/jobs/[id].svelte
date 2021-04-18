<script lang="ts">
	import JobApplyStatus from '$components/JobApplyStatus.svelte';
	import JobDetailedCard from '$components/JobDetailedCard.svelte';
	import JobMiniCompanyCard from '$components/JobMiniCompanyCard.svelte';
	import JobsPromoted from '$components/JobsPromoted.svelte';
	import JobApplicants from '$components/JobApplicants.svelte';
	import { onMount } from 'svelte';
	import { addReducerAndInterceptors, dispatch } from '$vendor/sedux';
	import { jobInterceptor } from '$interceptors/job';
	import { jobReducer } from '$reducers/job';
	import { jobStore } from '$stores/job';
	import { getJob } from '$actions/job';
	import { page } from '$app/stores';
	import { addListener } from '$vendor/sedux/listener';
	import { LOGGED_IN, LOGGED_OUT } from '$constants/app';

	onMount(() => {
		addReducerAndInterceptors(jobInterceptor, jobReducer, 'job', jobStore);

		dispatch(() => getJob($page.params.id, 'job'));

		addListener([LOGGED_IN, LOGGED_OUT], (): void => {
			dispatch(() => getJob($page.params.id, 'job'));
		});
	});
</script>

<div class="container">
	<JobDetailedCard {...$jobStore.job} />
	<div class="right sidebar">
		{#if $jobStore.job.result?.permissions?.write === false}
			<JobMiniCompanyCard />
			<JobsPromoted jobs={new Array(4)} />
		{:else}
			<JobApplicants />
		{/if}
		{#if !$jobStore.job.loading && $jobStore.job.result?.offered}
			<JobApplyStatus />
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.container {
		display: flex;
		flex-flow: row;
		padding: 2rem 4rem;
		justify-content: center;

		@media screen and (max-width: 1280px) {
			width: calc(100% - 8rem);
			justify-content: center;
		}

		@media screen and (max-width: 860px) {
			width: calc(100% - 8rem);
			flex-flow: column;
		}

		@media screen and (max-width: 680px) {
			padding: 0.5rem 1rem;
			width: calc(100% - 2rem);
		}

		.sidebar {
			& > :global(div) {
				margin-bottom: 0.8rem;
			}

			@media screen and (max-width: 860px) {
				margin-top: 1rem;
				display: flex;
				flex-flow: row;
				justify-content: space-between;
			}

			@media screen and (max-width: 750px) {
				flex-flow: column;
			}
		}
	}
</style>
