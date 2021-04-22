<script lang="ts">
	export let dir = 'left';
</script>

<group class={dir}>
	<slot />
</group>

<style lang="scss">
	group {
		display: flex;
		flex-wrap: wrap;

		&.right {
			margin-inline-start: auto;
		}
		&.center {
			position: absolute;
			margin: 0 auto;
		}

		& > :global(item) {
			margin: 0 0.4rem;
		}
	}
</style>
