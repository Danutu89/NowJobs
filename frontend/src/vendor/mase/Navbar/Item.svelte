<script lang="ts">
	export let effect: boolean,
		logo = false,
		link = false,
		to = '',
		selected = false;
</script>

<item class:effect class:logo class:link class:selected>
	{#if link && to}
		<a href={to} alt="link">
			<slot />
		</a>
	{:else}
		<slot />
	{/if}
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

		display: flex;
		justify-content: center;
		align-items: center;

		&.link {
			cursor: pointer;
		}

		&.selected {
			font-weight: 700;
		}

		a {
			color: $font-color;
			height: 100%;
			padding: 0.2rem 0.4rem;
			text-decoration: none;
			cursor: pointer;
		}

		:global(.button) {
			display: initial;
		}

		&.effect:hover {
			background: lighten($color: $navbar-background, $amount: 10);
		}

		&:hover {
			background: lighten($color: $navbar-background, $amount: 10);
		}
	}
</style>
