<script lang="ts">
	import { getLocations } from '$actions/locations';

	import { locationsInterceptor } from '$interceptors/locations';
	import { locationsReducer } from '$reducers/locations';
	import { locationsStore } from '$stores/locations';

	import { Select } from '$vendor/mase';
	import { createSlicer, dispatch } from '$vendor/sedux';
	import { onMount } from 'svelte';

	export let value: string;

	onMount(() => {
		createSlicer(locationsInterceptor, locationsReducer, 'locations', locationsStore);

		dispatch(() => getLocations('locations'));
	});

	const handleSearch = ({ detail: query }): void => {
		dispatch(() => getLocations('locations', query));
	};
</script>

<Select
	options={$locationsStore.locations.results}
	loading={$locationsStore.locations.loading}
	bind:value
	on:select
	on:search={handleSearch}
	placeholder="Search"
/>
