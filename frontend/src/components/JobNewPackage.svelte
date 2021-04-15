<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let _package,
		selected: boolean = false;

	const dispatch = createEventDispatcher();

	const handlePackageClick = (): void => {
		dispatch('select', _package?.id);
	};
</script>

<div class="package" on:click={handlePackageClick} class:selected>
	<div class="header">
		<h3>Basic</h3>
		<span>$90</span>
	</div>
	<div class="features">
		<li>Publicare Anunt</li>
		<li>Notificare Email</li>
		<li>Acces Panou</li>
	</div>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.package {
		border-radius: 10px;
		padding: 1rem;
		cursor: pointer;
		transition: all 0.3s linear;

		&:hover {
			background: $background;
		}

		&.selected {
			background: darken($color: $background, $amount: 3);
		}

		.header {
			font-weight: 700;
			margin-bottom: 0.5rem;
			font-size: 1rem;
			display: flex;
			flex-flow: row;

			h3 {
				margin: 0;
			}

			span {
				margin-inline-start: auto;
			}
		}
		.features {
			margin-left: 1rem;
		}
	}
</style>
