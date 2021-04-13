<nav>
	<container>
		<slot />
	</container>
</nav>

<style lang="scss">
	@import '../globals.scss';
	nav {
		position: sticky;
		position: -webkit-sticky;
		top: 0;
		display: flex;
		flex-flow: row;
		padding: 0.5rem;
		height: calc(50px - 1rem);
		background: $navbar-background;
		box-shadow: 0px 2px 5px #19191948;
		z-index: 10;

		container {
			position: relative;
			display: flex;
			flex-flow: row;
			width: 100%;
		}
	}
</style>
