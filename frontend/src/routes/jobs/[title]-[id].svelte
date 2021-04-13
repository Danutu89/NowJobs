<script lang="ts">
	import JobDetailedCard from '$components/JobDetailedCard.svelte';
	import JobMiniCompanyCard from '$components/JobMiniCompanyCard.svelte';
	import JobsPromoted from '$components/JobsPromoted.svelte';

	export let job = { company: {} };
</script>

<div class="container">
	<JobDetailedCard />
	<div class="right sidebar">
		<JobMiniCompanyCard company={job.company} />
		<JobsPromoted jobs={new Array(4)} />
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
			width: 250px;

			& > :global(div) {
				margin-bottom: 0.8rem;
			}
		}
	}
</style>
