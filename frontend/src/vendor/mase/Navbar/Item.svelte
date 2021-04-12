<script lang="ts">
	export let effect: boolean;
</script>

<item class:effect>
	<slot />
</item>

<style lang="scss">
	@import '../globals.scss';
	item {
		height: calc(100% - 0.4rem);
		padding: 0.2rem 0rem;
		color: $font-color;
		line-height: 1.8;
		border-radius: 6px;
		transition: all 0.3s linear;
		cursor: pointer;

		:global(.button) {
			display: initial;
		}

		&.effect:hover {
			background: lighten($color: $navbar-background, $amount: 10);
		}
	}
</style>
