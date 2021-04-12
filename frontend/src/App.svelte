<script>
	import I18n from '$vendor/i18n/I18n.svelte';
	import { Navbar } from '$vendor/mase';
	import Sedux from '$vendor/sedux/Sedux.svelte';
</script>

<Sedux>
	<I18n translations={{}}>
		<Navbar />
		<slot />
	</I18n>
</Sedux>

<style lang="scss">
	@import './app.scss';

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
