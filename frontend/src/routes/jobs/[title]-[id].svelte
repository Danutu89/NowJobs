<script lang="ts">
	import JobApplyStatus from '$components/JobApplyStatus.svelte';
	import JobDetailedCard from '$components/JobDetailedCard.svelte';
	import JobMiniCompanyCard from '$components/JobMiniCompanyCard.svelte';
	import JobsPromoted from '$components/JobsPromoted.svelte';
	import JobApplicants from '$components/JobApplicants.svelte';

	export let job = { company: {} };
</script>

<div class="container">
	<JobDetailedCard />
	<div class="right sidebar">
		{#if false}
			<JobMiniCompanyCard company={job.company} />
			<JobsPromoted jobs={new Array(4)} />
		{:else}
			<JobApplicants />
		{/if}
		{#if false}
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

		.sidebar {
			width: 300px;

			& > :global(div) {
				margin-bottom: 0.8rem;
			}
		}
	}
</style>
