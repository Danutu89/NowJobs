<script lang="ts">
	export let rows = 2,
		value = '',
		placeholder = '',
		style = '';
</script>

<textarea bind:value {rows} {placeholder} {style} />

<style lang="scss">
	@import './globals.scss';
	textarea {
		background: lighten($color: $background, $amount: 0);
		border: 1px solid lighten($color: $background, $amount: 5);
		color: $font-color;
		border-radius: 6px;
		padding: 0.9rem 0.8rem;
		font-size: 15px;
		resize: vertical;

		&:focus {
			outline: none;
		}
	}
</style>
