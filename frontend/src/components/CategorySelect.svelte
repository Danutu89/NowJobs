<script lang="ts">
	import { getCategories } from '$actions/categories';

	import { categoriesInterceptor } from '$interceptors/categories';
	import { categoriesReducer } from '$reducers/categories';
	import { categoriesStore } from '$stores/categories';

	import { Select } from '$vendor/mase';
	import { addReducerAndInterceptors, dispatch } from '$vendor/sedux';
	import { onMount } from 'svelte';

	export let value: string;

	onMount(() => {
		addReducerAndInterceptors(
			categoriesInterceptor,
			categoriesReducer,
			'categories',
			categoriesStore
		);

		dispatch(() => getCategories('categories'));
	});

	const handleSearch = ({ detail: query }): void => {
		dispatch(() => getCategories('categories', '', query));
	};
</script>

<Select
	options={$categoriesStore.categories.results}
	loading={$categoriesStore.categories.loading}
	bind:value
	on:select
	on:search={handleSearch}
	placeholder="Search"
/>
