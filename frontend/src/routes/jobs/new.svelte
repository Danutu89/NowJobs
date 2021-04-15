<script lang="ts">
	import JobNewCard from '$components/JobNewCard.svelte';
	import JobNewPackages from '$components/JobNewPackages.svelte';

	let selectedPackage: number = -1;
</script>

<div class="container">
	<JobNewCard />
	<div class="right sidebar">
		<JobNewPackages packages={new Array(3)} {selectedPackage} />
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
