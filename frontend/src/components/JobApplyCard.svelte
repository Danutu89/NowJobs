<script lang="ts">
	import { Input, TextArea, Button } from '$vendor/mase';
	import type { Offer } from '$types/jobs';
	import { page } from '$app/stores';
	import { dispatch } from '$vendor/sedux';
	import { applyJob } from '$actions/jobs';
	import { jobsStore } from '$stores/jobs';

	let data = {
		first_name: '',
		last_name: '',
		job: $page.params.id,
		description: '',
		phone: '',
		email: ''
	} as Offer;

	let errors = {
		phone: false,
		email: false,
		first_name: false,
		last_name: false
	};

	const handleApplyJob = (): void => {
		let check = Object.values(errors).reduce((prev, current) => {
			if (current) return true;
			current = prev;
			return current;
		}, false);

		if (check) return;

		dispatch(() => applyJob(data, 'jobs'));
	};
</script>

<div class="apply">
	<div class="group">
		<Input
			style="padding: 0.6rem 0.4rem;"
			bind:value={data.first_name}
			pattern={/^[a-zA-Z_ ]{4,50}$/}
			bind:error={errors.first_name}
			notEmpty
			fluid
			name="first_name"
			placeholder="First Name"
		/>
		<Input
			style="padding: 0.6rem 0.4rem;"
			bind:value={data.last_name}
			pattern={/^[a-zA-Z_ ]{4,500}$/}
			bind:error={errors.last_name}
			fluid
			notEmpty
			name="last_name"
			placeholder="Last Name"
		/>
	</div>
	<div class="group">
		<Input
			style="padding: 0.6rem 0.4rem;"
			bind:value={data.email}
			bind:error={errors.email}
			pattern={/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+).([a-zA-Z]{2,5})$/}
			fluid
			notEmpty
			name="email"
			placeholder="Email"
		/>
		<Input
			style="padding: 0.6rem 0.4rem;"
			bind:value={data.phone}
			bind:error={errors.phone}
			pattern={/^[0-9]{0,15}$/}
			notEmpty
			fluid
			name="phone"
			placeholder="Phone"
		/>
	</div>
	<TextArea
		rows={5}
		placeholder="Additional Notes"
		bind:value={data.description}
		style="margin-top: 0.8rem;"
	/>
	<div class="group">
		<Button
			styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);"
			centered
			color="secondary">Add CV</Button
		>
		<Button
			styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);"
			centered
			color="secondary"
			on:click={handleApplyJob}
			loading={$jobsStore.apply.loading}>Apply</Button
		>
	</div>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.apply {
		display: flex;
		flex-flow: column;

		.group {
			display: grid;
			grid-auto-flow: column;
			grid-gap: 1rem 1rem;
			margin-top: 0.8rem;

			@media screen and (max-width: 750px) {
				grid-auto-flow: row;
			}
		}
	}
</style>
