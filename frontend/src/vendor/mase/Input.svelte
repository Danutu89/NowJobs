<script lang="ts">
	export let value: string = '',
		name: string = '',
		placeholder: string = '',
		defaultValue: string = '',
		autofocus: boolean = false,
		type: string = 'text',
		maxlength: number = 100,
		label: boolean = false,
		pattern: string = null,
		error: string | boolean = false,
		mirrors: string | null = null,
		disabled: boolean = false,
		fluid: boolean = false,
		autocomplete: string = 'off',
		borderless: boolean = false,
		size: string = '16px',
		trasparent: boolean = false,
		style: boolean;

	let element, regPattern;

	$: if (element && autofocus) element.focus();
	$: if (element) element.type = type;
	$: if (pattern && value) {
		regPattern = new RegExp(pattern);
		error = !regPattern.test(value);
	} else {
		error = false;
	}
	$: if (mirrors && value) {
		if (value != mirrors) {
			error = true;
		}
	}

	$: if (defaultValue) {
		value = defaultValue;
	}
</script>

{#if label}
	<label for={element}>{label}</label>
{/if}
<input
	class:error
	class:disabled
	class:fluid
	class:trasparent
	{name}
	{placeholder}
	bind:value
	on:change
	on:input
	bind:this={element}
	{maxlength}
	{disabled}
	{autocomplete}
	class:borderless
	style="font-size: {size};{style}"
/>
{#if error && pattern}
	<label class="error" for={element}>Respect the format.</label>
{/if}
{#if mirrors && error}
	<label class="error" for={element}>Fields doesn`t match.</label>
{/if}

<style lang="scss">
	@import './globals.scss';
	label {
		color: darken($color: $font-color, $amount: 20);
		font-size: 11px;
		margin-bottom: 0.2rem;

		&.error {
			color: darken($color: red, $amount: 10);
			margin-top: 0.1rem;
		}
	}
	input {
		background: lighten($color: $background, $amount: 0);
		border: 1px solid lighten($color: $background, $amount: 5);
		color: $font-color;
		border-radius: 6px;
		padding: 0.3rem 0.4rem;
		font-size: 15px;

		&.disabled {
			background: darken($color: $background, $amount: 3);
			color: darken($color: $font-color, $amount: 20);
		}

		&.fluid {
			width: calc(100% - 1rem);
		}

		&.trasparent {
			background: none;
		}

		&.error {
			border: 1px solid darken($color: red, $amount: 10);
		}

		&:focus {
			outline: none;
		}

		&.borderless {
			border: none;
			padding: 0;
		}
	}
</style>
