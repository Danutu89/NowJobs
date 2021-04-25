<script lang="ts">
	import JobApplyStatus from '$components/JobApplyStatus.svelte';
	import JobDetailedCard from '$components/JobDetailedCard.svelte';
	import JobMiniCompanyCard from '$components/JobMiniCompanyCard.svelte';
	import JobsPromoted from '$components/JobsPromoted.svelte';
	import JobApplicants from '$components/JobApplicants.svelte';
	import { onMount } from 'svelte';
	import { createSlicer, dispatch } from '$vendor/sedux';
	import { jobsInterceptor } from '$interceptors/jobs';
	import { jobsReducer } from '$reducers/jobs';
	import { jobsStore } from '$stores/jobs';
	import { getJob } from '$actions/jobs';
	import { page } from '$app/stores';
	import { addListener } from '$vendor/sedux/listener';
	import { LOGGED_IN, LOGGED_OUT } from '$constants/app';

	onMount(() => {
		createSlicer(jobsInterceptor, jobsReducer, 'jobs', jobsStore);

		dispatch(() => getJob($page.params.id, 'jobs'));

		addListener([LOGGED_IN, LOGGED_OUT], (): void => {
			dispatch(() => getJob($page.params.id, 'jobs'));
		});
	});
</script>

<div class="container">
	<JobDetailedCard {...$jobsStore.job} />
	<div class="right sidebar">
		{#if $jobsStore.job.result?.permissions?.write === false}
			<JobMiniCompanyCard company={$jobsStore.job.result.owner} />
			<JobsPromoted jobs={new Array(4)} />
		{:else}
			<JobApplicants />
		{/if}
		{#if !$jobsStore.job.loading && $jobsStore.job.result?.offered}
			<JobApplyStatus />
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.container {
		display: flex;
		flex-flow: row;
		flex: 800px 350px auto;
		padding: 2rem 4rem;
		justify-content: center;

		@media screen and (max-width: 1280px) {
			width: calc(100% - 8rem);
			flex: calc(100% - 350px - 8rem) auto;
			justify-content: center;
		}

		@media screen and (max-width: 860px) {
			width: calc(100% - 8rem);
			flex-flow: column;
		}

		@media screen and (max-width: 680px) {
			padding: 0.5rem 1rem;
			min-width: calc(100% - 2rem);
		}

		.sidebar {
			& > :global(div) {
				margin-bottom: 0.8rem;
			}

			margin-left: 1rem;

			@media screen and (max-width: 860px) {
				margin-left: 0;

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
