<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import Button from '../Button.svelte';
	import Item from './Item.svelte';
	export let options: Array<{ value: string; text: string; callback?: () => void }> = [],
		color: string | null,
		name: string | null,
		defaultValue,
		className: string | null,
		dir = 'right',
		opened = false,
		disabled = false,
		styles: string | null;

	const dispatch = createEventDispatcher();
	let selected = null,
		dropdownElement,
		notSetDefault = false;

	$: if (defaultValue && !notSetDefault) {
		let temp = options.findIndex((item) => item.value === defaultValue);

		if (temp < 0) defaultValue = null;

		selected = options[temp];

		notSetDefault = true;
	}

	page.subscribe(() => {
		opened = false;
	});

	const handleSelect = (option, index) => {
		selected = option;
		opened = false;
		dispatch('select', { option, index });
	};

	const handleGeneralClick = (e) => {
		if (!dropdownElement.contains(e.target)) {
			opened = false;
		}
	};
</script>

<svelte:window on:click={handleGeneralClick} />

<dropdown bind:this={dropdownElement} class={className} style={styles}>
	{#if $$slots.trigger}
		<div
			on:click={() => {
				if (!disabled) opened = !opened;
			}}
		>
			<slot name="trigger" />
		</div>
	{:else}
		<Button
			on:click={() => {
				if (!disabled) opened = !opened;
			}}
			{color}
			styles="padding: 0.3rem 1rem;    width: fit-content; background: {selected
				? selected.color
				: ''}; border-color: {selected ? selected.color : ''}"
		>
			{selected ? selected.text : name}
		</Button>
	{/if}
	<div class="options {dir}" class:opened>
		{#if $$slots.default}
			<div
				on:click={() => {
					if (!disabled) opened = !opened;
				}}
				style="display: flex;
        flex-flow: column;"
			>
				<slot />
			</div>
		{:else}
			{#each options as option, index}
				<Item
					selected={selected ? selected.value === option.value : false}
					on:click={() => {
						if (!disabled) handleSelect(option, index);
						if (option.callback) option.callback();
					}}>{option.text}</Item
				>
			{/each}
		{/if}
	</div>
</dropdown>

<style lang="scss">
	@import '../globals.scss';

	dropdown {
		display: block;
		position: relative;

		.options {
			display: none;
			position: absolute;
			margin-top: 0.2rem;
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
		}
	}
</style>
