<script lang="ts">
	export let items: Array<any>;
</script>

<list>
	{#if $$slots.default}
		<slot />
	{/if}
</list>

<style lang="scss">
	@import '../globals.scss';
	list {
		display: flex;
		flex-flow: column;
		height: 100%;
		background: lighten($color: $background, $amount: 0);
		border: 1px solid lighten($color: $background, $amount: 5);
		color: $font-color;
		border-radius: 6px;
		padding: 0.3rem 0.4rem;
		font-size: 15px;
	}
</style>
