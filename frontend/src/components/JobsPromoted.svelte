<script lang="ts">
	import Segment from '$vendor/mase/Segment.svelte';
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import JobMiniCard from './JobMiniCard.svelte';

	export let jobs: Array<any> = [],
		loading = false,
		error = '';
</script>

<Segment>
	<div class="promoted">
		<h2>Promoted Jobs</h2>
		<div class="list" class:loading class:error>
			{#if !loading}
				{#if jobs.length > 0}
					{#each jobs as job}
						<JobMiniCard {job} />
					{/each}
				{:else}
					No Jobs
				{/if}
			{:else if loading}
				<Circle color="#258cf4" size={30} />
			{:else if !loading && error}
				{error}
			{/if}
		</div>
	</div>
</Segment>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.promoted {
		height: min-content;
		width: 250px;

		h2 {
			margin-top: 0;
			font-size: 1.3rem;
		}

		@media screen and (max-width: 750px) {
			width: calc(100% - 3rem);
		}

		.list {
			display: grid;
			grid-auto-flow: row;
			gap: 0.4rem;
			min-height: 100px;

			&.error,
			&.loading {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
