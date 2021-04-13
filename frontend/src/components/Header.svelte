<script>
	import { Button } from '$vendor/mase';
	import { Group, Item, Navbar } from '$vendor/mase/Navbar';
	import { page } from '$app/stores';
</script>

<Navbar>
	<Item logo link to="/">NowJobs</Item>

	<Group dir="right">
		<Item link to="/" selected={$page.path === '/'}>Home</Item>
		<Item>Contact</Item>
		<Item link to="/jobs" selected={$page.path === '/jobs'}>Jobs</Item>
		<Item>
			<Button color="secondary" trasparent>Login</Button>
		</Item>
		<Item>
			<Button color="secondary">Register</Button>
		</Item>
	</Group>
</Navbar>
