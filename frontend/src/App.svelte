<script>
	import Header from '$components/Header.svelte';

	import I18n from '$vendor/i18n/I18n.svelte';
	import Sedux from '$vendor/sedux/Sedux.svelte';
</script>

<Sedux>
	<I18n translations={{}}>
		<Header />
		<slot />
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
