<script lang="ts">
	import { getApplicant } from '$actions/applicants';
	import { applicantsStore } from '$stores/applicants';

	import { Modal } from '$vendor/mase';
	import Button from '$vendor/mase/Button.svelte';
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import { dispatch } from '$vendor/sedux';
	import Error from '../routes/$error.svelte';
	import { onMount } from 'svelte';

	export let applicant: string = '';

	let opened: boolean = applicant != '';

	$: opened = applicant != '';

	$: {
		if (opened && applicant) dispatch(() => getApplicant(applicant, 'applicants'));
	}
</script>

<Modal {opened} on:close>
	{#if $applicantsStore.applicant.loading && $applicantsStore.applicant.error.status === 200}
		<Circle color="#258cf4" size={30} />
	{:else if $applicantsStore.applicant.error.status !== 200 && !$applicantsStore.applicant.loading}
		<Error
			error={$applicantsStore.applicant.error}
			status={$applicantsStore.applicant.error.status}
		/>
	{:else}
		<div class="main">
			<div class="header">
				<h2>{$applicantsStore.applicant.result.first_name}</h2>
			</div>
			<div class="body">
				<h4>Data:</h4>
				<div class="group">
					<span class="name">Full Name:</span>
					<span class="value"
						>{$applicantsStore.applicant.result.first_name}
						{$applicantsStore.applicant.result.last_name}</span
					>
				</div>
				<div class="group">
					<span class="name">Email:</span>
					<span class="value">{$applicantsStore.applicant.result.email}</span>
				</div>
				<div class="group">
					<span class="name">Phone:</span>
					<span class="value">{$applicantsStore.applicant.result.phone}</span>
				</div>
				<h4 style="margin-top: 1rem;">Notes</h4>
				<div class="description">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit similique aperiam
					voluptates dolorum nihil cum blanditiis et saepe ea? Similique vel recusandae quod, cum
					aperiam illum necessitatibus quaerat vitae sunt?
				</div>
			</div>
			<div class="footer">
				<Button
					styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);margin-top: 1rem;"
					centered
					color="secondary">View CV</Button
				>
			</div>
		</div>
	{/if}
</Modal>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.main {
		.header {
			margin-bottom: 1rem;
			h2 {
				margin: 0;
			}
		}

		.body {
			display: flex;
			flex-flow: column;

			h4 {
				margin: 0.5rem 0;
			}

			.group {
				display: flex;
				flex-flow: row;
				padding: 0.4rem 0;

				.name {
					color: $font-color;
				}

				.value {
					color: $font-color-full;
					margin-left: 0.4rem;
				}
			}

			.description {
				margin: 0.5rem 0;
			}
		}
	}
</style>
