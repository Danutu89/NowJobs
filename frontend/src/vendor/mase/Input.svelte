<script lang="ts">
	export let value = '',
		name = '',
		placeholder = '',
		defaultValue = '',
		autofocus = false,
		type = 'text',
		maxlength = 100,
		label = '',
		pattern: RegExp | null,
		error: string | boolean = false,
		mirrors: string | null = null,
		disabled = false,
		fluid = false,
		autocomplete = 'off',
		borderless = false,
		size = '16px',
		trasparent = false,
		notEmpty = false,
		style = '';

	let notEmptyError = false;
	let firstType = false;

	let element: HTMLInputElement, regPattern;

	$: if (element && autofocus) element.focus();
	$: if (element) element.type = type;
	$: if (pattern && value) {
		regPattern = new RegExp(pattern);
		error = !regPattern.test(value);
		notEmptyError = false;
	} else {
		if (notEmpty) {
			notEmptyError = error = !value && notEmpty && firstType;
		} else error = notEmptyError = false;
	}

	$: if (mirrors && value) {
		if (value != mirrors) {
			error = true;
		}
	}

	$: if (defaultValue) {
		value = defaultValue;
	}

	$: if (value != '' && !firstType) firstType = true;
</script>

<div style="width: 100%">
	{#if label}
		<label for={element}>{label}</label>
	{/if}
	{#if notEmptyError}
		<label class="error" for={element}>Field empty.</label>
	{:else if error && pattern}
		<label class="error" for={element}>Respect the format.</label>
	{:else if mirrors && error}
		<label class="error" for={element}>Fields doesn`t match.</label>
	{/if}
	<input
		class:error={error || notEmptyError}
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
</div>

<style lang="scss">
	@import './globals.scss';
	label {
		color: darken($color: $font-color, $amount: 20);
		font-size: 11px;
		margin-bottom: 0.2rem;

		&.error {
			color: darken($color: red, $amount: 10);
			position: absolute;
			margin-top: -0.9rem;
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
