<script lang="ts">
	import { dev } from '$app/env';

	export let error: { message: string }, status: number;
</script>

<div class="error">
	<h1>
		Ooops {status}
	</h1>

	{#if dev}
		{error.message}
	{/if}
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.error {
		width: 100%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-content: center;
		text-align: center;
		padding: 4rem;

		h1 {
			color: $font-color;
		}
	}
</style>
