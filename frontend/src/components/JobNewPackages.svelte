<script lang="ts">
	import Segment from '$vendor/mase/Segment.svelte';
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import JobNewPackage from './JobNewPackage.svelte';

	export let packages: Array<any> = [],
		loading = false,
		error = '',
		selectedPackage = -1;

	const handleSelectPackage = ({ detail }): void => {
		selectedPackage = detail;
	};
</script>

<Segment>
	<div class="packages">
		<h2>Post Packages</h2>
		<div class="list" class:loading class:error>
			{#if !loading}
				{#if packages.length > 0}
					{#each packages as _package}
						<JobNewPackage
							{_package}
							on:select={handleSelectPackage}
							selected={_package?.id === selectedPackage}
						/>
					{/each}
				{:else}
					No Packages
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

	.packages {
		height: min-content;
		width: 300px;

		h2 {
			margin-top: 0;
			font-size: 1.3rem;
		}

		@media screen and (max-width: 1280px) {
			width: calc(100% - 3rem);
		}

		.list {
			display: grid;
			grid-auto-flow: row;
			gap: 0.4rem;
			min-height: 100px;

			@media screen and (max-width: 1280px) {
				grid-auto-flow: column;
			}

			@media screen and (max-width: 860px) {
				grid-auto-flow: row;
			}

			&.error,
			&.loading {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
