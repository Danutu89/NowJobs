<script lang="ts">
	import { register } from '$actions/app';
	import { REGISTERED } from '$constants/app';

	import { appStore } from '$stores/app';

	import Button from '$vendor/mase/Button.svelte';

	import Input from '$vendor/mase/Input.svelte';

	import Modal from '$vendor/mase/Modal.svelte';
	import { dispatch } from '$vendor/sedux';
	import { addListener } from '$vendor/sedux/listener';

	import { createEventDispatcher, onMount } from 'svelte';

	export let opened = false;
	let email = '',
		password1 = '',
		password2 = '';

	const sDispatcher = createEventDispatcher();

	const handleKeyPress = (e): void => {
		if (e.keyCode != 13 || !opened) return;
		handleLogin();
	};

	const handleClose = (): void => {
		email = '';
		password1 = '';
		password2 = '';
		sDispatcher('close');
	};

	const handleLogin = (): void => {
		dispatch(() => register({ email, password1, password2 }, 'app'));
	};

	onMount(() => {
		addListener([REGISTERED], () => sDispatcher('close'));
	});
</script>

<svelte:window on:keyup={handleKeyPress} />
<Modal {opened} on:close={handleClose}>
	<main>
		<div class="header">
			<h2>Register</h2>
		</div>
		<div class="content">
			<Input name="email" fluid placeholder="Email" bind:value={email} autofocus />
			<Input type="password" fluid name="password" placeholder="Password" bind:value={password1} />
			<Input
				type="password"
				fluid
				name="password1"
				placeholder="Repeat Password"
				bind:value={password2}
				mirrors={password1}
			/>
			<Button
				color="secondary"
				styles="padding: 0.3rem 2rem;border-radius: 20px;width: calc(100% - 4rem);margin-top: 0.8rem;"
				centered
				loading={$appStore.register.loading}
				on:click={handleLogin}>Register</Button
			>
		</div>
		{#if $appStore.register.error}
			<div class="errors">
				<span>{$appStore.login.error}</span>
			</div>
		{/if}
	</main>
</Modal>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';
	main {
		display: flex;
		flex-flow: column;
		padding: 1rem;

		.header {
			text-align: center;
			color: $font-color;
			margin-bottom: 1rem;
			h2 {
				margin-block-start: 0;
			}
		}

		.content {
			display: grid;
			grid-auto-flow: row;
			grid-gap: 0.5rem;
		}

		.errors {
			margin-top: 1rem;
			font-size: 0.9rem;
			span {
				color: $error-color;
			}
		}
	}
</style>
