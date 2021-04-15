<script lang="ts">
	import type { Job } from '$types/jobs';

	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import JobCard from './JobCard.svelte';

	export let results: Array<Job> = [],
		loading: boolean,
		error: string;
</script>

<container class:loading class:error>
	{#if !loading}
		{#if results.length > 0}
			{#each results as job}
				<JobCard {job} />
			{/each}
		{:else}
			No Jobs
		{/if}
	{:else if loading}
		<Circle color="#258cf4" size={30} />
	{:else if !loading && error}
		{error}
	{/if}
</container>

<style lang="scss">
	container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem 2rem;
		margin: 4rem;

		&.error,
		&.loading {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
