<script lang="ts">
	import { refreshToken } from '$actions/app';

	import Header from '$components/Header.svelte';
	import { LOGGED_IN, REFRESHED_TOKEN, REFRESH_TOKEN_FAILED } from '$constants/app';
	import { appInterceptor } from '$interceptors/app';
	import { appReducer } from '$reducers/app';
	import { appStore } from '$stores/app';
	import { I18n } from '$vendor/i18n';
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import { createSlicer, dispatch } from '$vendor/sedux';
	import { addListener } from '$vendor/sedux/listener';
	import Sedux from '$vendor/sedux/Sedux.svelte';
	import type { Slicer } from '$vendor/sedux/types/action';
	import { onMount } from 'svelte';

	let slicer: Slicer,
		loaded = false,
		refreshed = false;

	onMount(() => {
		slicer = createSlicer(appInterceptor, appReducer, 'app', appStore, 'user');

		slicer.subscribe(({ app }) => {
			loaded = !!app._persistLoaded;
		});

		if (loaded && $appStore.user.loggedIn === true) {
			dispatch(() => refreshToken('app'));
		}

		addListener([REFRESHED_TOKEN, REFRESH_TOKEN_FAILED, LOGGED_IN], () => {
			refreshed = true;
		});
	});
</script>

<Sedux>
	<I18n translations={{}}>
		{#if ($appStore.user.loggedIn && loaded && refreshed) || (!$appStore.user.loggedIn && loaded)}
			<Header />
			<slot />
		{:else}
			<Circle />
		{/if}
	</I18n>
</Sedux>

<style lang="scss">
	@import './app.scss';

	:global(body) {
		margin: 0;
		padding: 0;
		background: $background;
		height: 100%;
	}
</style>
