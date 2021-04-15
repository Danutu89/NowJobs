<script lang="ts">
	import { appStore } from '$stores/app';
	import { Button, Dropdown } from '$vendor/mase';
	import { Group, Item, Navbar } from '$vendor/mase/Navbar';
	import { page } from '$app/stores';
	import LoginModal from './LoginModal.svelte';
	import { Item as DropdownItem } from '$vendor/mase/Dropdown';

	let loginOpened: boolean = false,
		accountOptions: Array<{ value: string; text: string }> = [
			{ value: 'jobs', text: 'Jobs' },
			{ value: 'account', text: 'Account' },
			{ value: 'logout', text: 'Logout' }
		];

	const handleLoginOpen = (): void => {
		loginOpened = true;
	};

	const handleLoginClose = (): void => {
		loginOpened = false;
	};
</script>

<Navbar>
	<Item logo link to="/">NowJobs</Item>

	<Group dir="right">
		<Item link to="/" selected={$page.path === '/'}>Home</Item>
		<Item>Contact</Item>
		<Item link to="/jobs" selected={$page.path === '/jobs'}>Jobs</Item>
		{#if !$appStore.user.loggedIn}
			<Item>
				<Button color="secondary" trasparent on:click={handleLoginOpen}>Login</Button>
			</Item>
			<Item>
				<Button color="secondary">Register</Button>
			</Item>
		{:else}
			<Item
				><Dropdown options={accountOptions}>
					<svelte:fragment slot="trigger"
						><Button trasparent color="secondary">Account</Button></svelte:fragment
					>
				</Dropdown></Item
			>
		{/if}
	</Group>
</Navbar>

<LoginModal opened={loginOpened} on:close={handleLoginClose} />
