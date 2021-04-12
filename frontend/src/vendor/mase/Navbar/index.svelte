<nav>
	<slot />
</nav>

<style lang="scss">
	@import '../globals.scss';
	nav {
		position: sticky;
		top: 0;
		display: flex;
		flex-flow: row;
		padding: 0.5rem;
		height: calc(50px - 1rem);
		background: $navbar-background;
		box-shadow: 0px 2px 5px #191919;
		z-index: 10;
	}
</style>
