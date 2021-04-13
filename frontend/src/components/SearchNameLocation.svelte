<script lang="ts">
	import { Button, Input, Select } from '$vendor/mase';

	export let name: string, location: number;
</script>

<div class="search">
	<Input style="padding: 0.6rem 0.4rem;" fluid name="name" placeholder="Name" bind:value={name} />
	<Select
		style="padding: 0.6rem 0.4rem;"
		name="location"
		placeholder="Location"
		bind:value={location}
	/>
	<Button
		styles="padding: 0.6rem 2rem;border-radius: 20px;margin-left: 1rem;margin-inline-start: auto;"
		color="secondary">Search</Button
	>
</div>

<style lang="scss">
	.search {
		margin: 0 auto;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 40% 40% auto;
		width: calc(100% - 10rem);
	}
</style>
