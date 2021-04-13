<script lang="ts">
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import JobCard from './JobCard.svelte';

	export let jobs: Array<unknown> = [],
		loading: boolean,
		error: string;
</script>

<container class:loading class:error>
	{#if !loading}
		{#if jobs.length > 0}
			{#each jobs as job}
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
