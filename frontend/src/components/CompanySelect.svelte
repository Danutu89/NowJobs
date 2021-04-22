<script lang="ts">
	import { getCompanies } from '$actions/companies';

	import { companiesInterceptor } from '$interceptors/companies';
	import { companiesReducer } from '$reducers/companies';
	import { companiesStore } from '$stores/companies';

	import { Select } from '$vendor/mase';
	import { createSlicer, dispatch } from '$vendor/sedux';
	import { onMount } from 'svelte';

	export let value: string;

	onMount(() => {
		createSlicer(companiesInterceptor, companiesReducer, 'companies', companiesStore);

		dispatch(() => getCompanies('companies'));
	});

	const handleSearch = ({ detail: query }): void => {
		dispatch(() => getCompanies('companies', '', query));
	};
</script>

<Select
	options={$companiesStore.companies.results}
	loading={$companiesStore.companies.loading}
	bind:value
	on:select
	on:search={handleSearch}
	placeholder="Search"
/>
