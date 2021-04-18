<script lang="ts">
	import type { Job } from '$types/jobs';

	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import JobCard from './JobCard.svelte';

	export let results: Array<Job> = [],
		loading: boolean,
		error: {
			status: number;
			message: string;
		};
</script>

<container class:loading class:error={error.status !== 200}>
	{#if !loading && error.status === 200}
		<div class="inner">
			{#if results.length > 0}
				{#each results as job}
					<JobCard {job} />
				{/each}
			{:else}
				No Jobs
			{/if}
		</div>
	{:else if loading && error.status === 200}
		<Circle color="#258cf4" size={30} />
	{:else if !loading && error.status !== 200}
		{error}
	{/if}
</container>

<style lang="scss">
	container {
		display: grid;
		grid-template-columns: 1fr repeat(1, minmax(300px, 1200px)) 1fr;
		gap: 1rem 2rem;
		margin: 4rem;

		@media screen and (max-width: 860px) {
			margin: 2rem auto;
			width: calc(100% - 2rem);
			gap: 0;
		}

		.inner {
			grid-column: 2;
			display: grid;
			gap: 1rem 2rem;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		&.error,
		&.loading {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
