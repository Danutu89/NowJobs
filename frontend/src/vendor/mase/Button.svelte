<script lang="ts">
	import Circle from './Spinners/Circle.svelte';
	export let color: 'primary' | 'secondary' | 'default',
		effect: boolean,
		styles: string,
		borderless: boolean,
		loading = false,
		fluid = false,
		id: null | string = null,
		disabled = false,
		centered = false,
		clientWidth = 0,
		trasparent = false;
</script>

<div
	class="button {color || 'default'}"
	style={styles}
	class:borderless
	class:effect
	class:fluid
	class:disabled
	class:centered
	class:trasparent
	{id}
	bind:clientHeight={clientWidth}
	on:click
>
	{#if loading === true}
		<Circle size={15} color="white" />
	{:else if $$slots.element}
		<slot name="element" />
	{:else}
		<span>
			<slot />
		</span>
	{/if}
</div>

<style lang="scss">
	@import './globals.scss';
	.button {
		padding: 0rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		width: min-content;
		display: block;
		height: fit-content;

		span {
			font-weight: 700;
			font-size: 14px;
			color: $font-color;
		}

		&.centered {
			text-align: center;
			place-content: center;
			text-align: -webkit-center;
		}

		&.fluid {
			display: flex;
			width: max-content;
		}

		&.effect {
			transition: all 0.3s linear;
		}

		&.primary {
			background: $primary-color;
			border: 1px solid darken($color: $primary-color, $amount: 20);

			span {
				color: $font-color-on-color;
			}

			&:hover {
				background: darken($color: $primary-color, $amount: 10);
			}

			&:focus {
				background: darken($color: $primary-color, $amount: 10);
			}

			&:active {
				background: darken($color: $primary-color, $amount: 15);
			}

			&.disabled {
				background: darken($color: $primary-color, $amount: 20);
				pointer-events: none;
			}
		}

		&.default {
			background: $background;
			border: 1px solid $border-color;

			&:hover {
				background: lighten($color: $background, $amount: 10);
			}

			&:focus {
				background: lighten($color: $background, $amount: 10);
			}

			&:active {
				background: lighten($color: $background, $amount: 15);
			}

			&.disabled {
				background: darken($color: $background, $amount: 20);
				pointer-events: none;
			}
		}

		&.secondary {
			background: $secondary-color;
			border: 1px solid lighten($color: $secondary-color, $amount: 10);

			span {
				color: $font-color-on-color;
			}

			&:hover {
				background: lighten($color: $secondary-color, $amount: 10);
			}

			&:focus {
				background: lighten($color: $secondary-color, $amount: 10);
			}

			&:active {
				background: lighten($color: $secondary-color, $amount: 15);
			}

			&.disabled {
				background: darken($color: $secondary-color, $amount: 20);
				pointer-events: none;
			}
		}

		&.error {
			background: red;
			border: 1px solid lighten($color: red, $amount: 10);

			span {
				color: $font-color-on-color;
			}

			&:hover {
				background: lighten($color: red, $amount: 10);
			}

			&:focus {
				background: lighten($color: red, $amount: 10);
			}

			&:active {
				background: lighten($color: red, $amount: 15);
			}

			&.disabled {
				background: darken($color: red, $amount: 20);
				pointer-events: none;
			}
		}

		&.borderless {
			border: none;

			&:hover {
				background: none;
			}

			&:focus {
				background: none;
			}

			&:active {
				background: none;
			}
		}

		&.trasparent {
			background: transparent;

			border-width: 2px;

			span {
				color: $font-color-full;
			}

			&:hover {
				span {
					color: $font-color-on-color;
				}
			}
		}
	}
</style>
