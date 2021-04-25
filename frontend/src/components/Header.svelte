<script lang="ts">
	import { appStore } from '$stores/app';
	import { Button, Dropdown } from '$vendor/mase';
	import { Group, Item, Navbar } from '$vendor/mase/Navbar';
	import { page } from '$app/stores';
	import LoginModal from './LoginModal.svelte';
	import MediaQuery from '$vendor/mase/utils/MediaQuery.svelte';
	import { dispatch } from '$vendor/sedux';
	import { logout } from '$actions/app';
	import { goto } from '$app/navigation';
	import RegisterModal from './RegisterModal.svelte';

	let loginOpened = false,
		registerOpened = false;

	const handleLogout = (): void => {
		dispatch(() => logout('app'));
	};

	const handleLoginOpen = (): void => {
		loginOpened = true;
	};

	const handleLoginClose = (): void => {
		loginOpened = false;
	};

	const handleRegisterOpen = (): void => {
		registerOpened = true;
	};

	const handleRegisterClose = (): void => {
		registerOpened = false;
	};

	const accountOptions: Array<{ value: string; text: string; callback?: () => void | void }> = [
		{ value: 'jobs', text: 'Jobs', callback: () => goto('/jobs') },
		{ value: 'account', text: 'Account' },
		{ value: 'logout', text: 'Logout', callback: handleLogout }
	];

	const generalOptions: Array<{ value: string; text: string; callback?: () => void }> = [
		{ value: 'post', text: 'Post Job', callback: () => goto('jobs/new') },
		{ value: 'register', text: 'Register', callback: handleRegisterOpen },
		{ value: 'login', text: 'Login', callback: handleLoginOpen }
	];
</script>

<Navbar>
	<Item logo link to="/">NowJobs</Item>

	<Group dir="right">
		<MediaQuery query="(min-width: 900px)" let:matches>
			{#if matches}
				<Item link to="/" selected={$page.path === '/'}>Home</Item>
				<Item>Contact</Item>
			{/if}
		</MediaQuery>
		<Item link to="/jobs" selected={$page.path === '/jobs'}>Jobs</Item>
		{#if !$appStore.user.loggedIn}
			<MediaQuery query="(max-width: 650px)" let:matches>
				{#if matches}
					<Item
						><Dropdown options={generalOptions}>
							<svelte:fragment slot="trigger"
								><Button trasparent color="secondary">Menu</Button></svelte:fragment
							>
						</Dropdown></Item
					>
				{:else}
					<Item>
						<Button color="secondary" on:click={() => goto('/jobs/new')} fluid>Post Job</Button>
					</Item>
					<Item>
						<Button color="secondary" trasparent on:click={handleLoginOpen}>Login</Button>
					</Item>
					<Item>
						<Button color="secondary" on:click={handleRegisterOpen}>Register</Button>
					</Item>
				{/if}
			</MediaQuery>
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
<RegisterModal opened={registerOpened} on:close={handleRegisterClose} />
