<script lang="ts">
	import { Button, Input, Select } from '$vendor/mase';
	import MediaQuery from '$vendor/mase/utils/MediaQuery.svelte';
	import { createEventDispatcher } from 'svelte';

	export let name: string, location: string;

	const dispatch = createEventDispatcher();

	const handleChange = (): void => {
		dispatch('change');
	};

	const handleToggleSidebar = (): void => {
		dispatch('toggleSidebar');
	};
</script>

<div class="search">
	<Input
		style="padding: 0.6rem 0.4rem;"
		fluid
		name="name"
		placeholder="Name"
		bind:value={name}
		on:change={handleChange}
	/>
	<Select
		style="padding: 0.6rem 0.4rem;"
		name="location"
		placeholder="Location"
		bind:value={location}
		on:select={handleChange}
	/>
	<Button
		styles="padding: 0.6rem 2rem;border-radius: 20px;margin-left: 1rem;margin-inline-start: auto;"
		color="secondary"
		centered
		on:click={handleChange}>Search</Button
	>
	<MediaQuery query="(max-width: 860px)" let:matches>
		{#if matches}
			<Button
				styles="padding: 0.6rem 2rem;border-radius: 20px;"
				color="secondary"
				centered
				on:click={handleToggleSidebar}>Filters</Button
			>
		{/if}
	</MediaQuery>
</div>

<style lang="scss">
	.search {
		margin: 0 auto;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 40% 40% auto;
		width: calc(100% - 10rem);

		@media screen and (max-width: 860px) {
			margin: 0 2rem;
			width: calc(100% - 4rem);
			grid-template-columns: 32% 32% auto;
			grid-gap: 1rem;
		}

		@media screen and (max-width: 680px) {
			grid-auto-flow: row;
			grid-template-columns: none;
			grid-gap: 1rem;
			margin: 0 2rem;

			& > :global(div) {
				min-width: calc(100% - 4rem);
			}
		}
	}
</style>
