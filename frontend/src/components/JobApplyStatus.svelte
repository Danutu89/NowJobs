<script lang="ts">
	export let status: string = 'Not Opened';
</script>

<div class="status">
	<span class="name">Apply Status: </span>
	<span class="value">{status}</span>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.status {
		background: $background-secondary;
		border-radius: 10px;
		border: 1px solid darken($color: $background, $amount: 5);
		padding: 1rem;
		display: flex;
		flex-flow: row;
		align-items: center;

		.name {
			font-weight: 700;
			font-size: 1rem;
			margin-right: 0.4rem;
		}
		.value {
			font-size: 0.9rem;
		}
	}
</style>
