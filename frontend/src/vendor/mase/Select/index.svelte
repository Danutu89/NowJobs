<script lang="ts">
	import Input from '$vendor/mase/Input.svelte';
	import Circle from '../Spinners/Circle.svelte';
	import type { Option, Value } from './types/option';

	export let loading: boolean = false,
		options: Array<Option> = [],
		opened: boolean = false,
		dir: 'left' | 'right' = 'right',
		placeholder: string = 'default',
		value: Value | null,
		style: string = '',
		name: string | 'select';

	let tempOptions = options || [];
	let searchValue: string = '';
	let maxWidth: number = 0;
	let selectElement: HTMLElement;
	let selectedValue: Option | null;

	$: {
		tempOptions = options || [];
	}

	$: {
		tempOptions = [...options.filter((item) => item.text.toLowerCase().includes(searchValue))];
	}

	const handleOpenOptions = (): void => {
		opened = !opened && !loading;
	};

	const handleSelect = (option: Option): void => {
		value = option.value;
		selectedValue = option;
		handleOpenOptions();
	};

	const handleGeneralClick = (e) => {
		if (!selectElement.contains(e.target)) {
			opened = false;
		}
	};
</script>

<svelte:window on:click={handleGeneralClick} />

<dropdown bind:offsetWidth={maxWidth} bind:this={selectElement}>
	<div class="trigger" on:click={handleOpenOptions} {style}>
		{#if !loading}{selectedValue?.text || placeholder}
		{:else}
			<Circle size={15} style="margin-inline-start: auto;" color="#258cf4" />
		{/if}
	</div>
	<div class="options {dir}" class:opened style="max-width: calc({maxWidth}px - 1rem);">
		<div class="search">
			<Input
				{name}
				fluid
				{placeholder}
				style="width: calc(100% - 0.9rem);"
				bind:value={searchValue}
			/>
		</div>
		<div class="list">
			{#if !loading}
				{#each tempOptions as option}
					<div class="item" on:click={() => handleSelect(option)}>{option.text}</div>
				{/each}
			{/if}
		</div>
	</div>
</dropdown>

<style lang="scss">
	@import '../globals.scss';

	dropdown {
		display: block;
		color: $font-color;

		.trigger {
			border-radius: 6px;
			font-size: 15px;
			background: lighten($color: $background, $amount: 0);
			border: 1px solid lighten($color: $background, $amount: 5);
			cursor: pointer;
			padding: 0.3rem 0.4rem;
			transition: all 0.3s linear;

			&:hover {
				background: darken($color: $background, $amount: 4);
			}
		}

		.options {
			display: none;
			position: absolute;
			margin-top: 0.2rem;
			padding: 0.4rem;
			background: lighten($color: $background, $amount: 10);
			border: 1px solid lighten($color: $background, $amount: 20);
			box-shadow: 0px 3px 6px 2px rgb(0 0 0 / 20%);
			border-radius: 6px;
			width: 100%;
			z-index: 2;

			&.opened {
				display: flex;
				flex-flow: column;
			}

			&.left {
				transform: translateX(-50%);
			}

			.list {
				.item {
					padding: 0.3rem 0.6rem;
					font-size: 16px;
					transition: all 0.3s linear;
					cursor: pointer;
					border-radius: 6px;

					&:hover {
						background: $background;
					}
				}
			}
		}
	}
</style>
