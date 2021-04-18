<script lang="ts">
	import { getDomains } from '$actions/domains';

	import { domainsInterceptor } from '$interceptors/domains';
	import { domainsReducer } from '$reducers/domains';
	import { domainsStore } from '$stores/domains';

	import { Select } from '$vendor/mase';
	import { addReducerAndInterceptors, dispatch } from '$vendor/sedux';
	import { onMount } from 'svelte';

	export let value: string;

	onMount(() => {
		addReducerAndInterceptors(domainsInterceptor, domainsReducer, 'domains', domainsStore);

		dispatch(() => getDomains('domains'));
	});

	const handleSearch = ({ detail: query }): void => {
		dispatch(() => getDomains('domains', query));
	};
</script>

<Select
	options={$domainsStore.domains.results}
	loading={$domainsStore.domains.loading}
	bind:value
	on:select
	on:search={handleSearch}
	placeholder="Search"
/>
