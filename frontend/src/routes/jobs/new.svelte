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

		@media screen and (max-width: 1280px) {
			width: calc(100% - 8rem);
			justify-content: center;
			flex-flow: column-reverse;
		}

		@media screen and (max-width: 860px) {
			width: calc(100% - 8rem);
		}

		@media screen and (max-width: 680px) {
			padding: 0.5rem 1rem;
			width: calc(100% - 2rem);
		}

		.sidebar {
			& > :global(div) {
				margin-bottom: 0.8rem;
			}

			@media screen and (max-width: 1280px) {
				margin-top: 1rem;
			}
		}
	}
</style>
