<script lang="ts">
	import { getApplicants } from '$actions/applicants';
	import { page } from '$app/stores';

	import { applicantsInterceptor } from '$interceptors/applicants';
	import { applicantsReducer } from '$reducers/applicants';
	import { applicantsStore } from '$stores/applicants';

	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import { addReducerAndInterceptors, dispatch } from '$vendor/sedux';
	import type { Slicer } from '$vendor/sedux/types/action';
	import { onMount } from 'svelte';
	import ApplicantModal from './ApplicantModal.svelte';
	import JobApplicant from './JobApplicant.svelte';

	let selectedApplicant = '',
		slicer: Slicer,
		loaded = false;

	const handleApplicantSelect = ({ detail }): void => {
		selectedApplicant = detail;
	};

	const handleApplicantModalClose = (): void => {
		selectedApplicant = '';
	};

	onMount(() => {
		slicer = addReducerAndInterceptors(
			applicantsInterceptor,
			applicantsReducer,
			'applicants',
			applicantsStore
		);

		slicer.subscribe(({ applicants }) => {
			loaded = !!applicants;
		});

		dispatch(() => getApplicants($page.params.id, 'applicants'));
	});
</script>

<div class="applicants">
	<h2>Applicants</h2>
	<div
		class="list"
		class:loading={$applicantsStore.applicants.loading}
		class:error={$applicantsStore.applicants.error.status !== 200}
	>
		{#if !$applicantsStore.applicants.loading}
			{#if $applicantsStore.applicants.results.length > 0}
				{#each $applicantsStore.applicants.results as applicant}
					<JobApplicant {applicant} on:select={handleApplicantSelect} />
				{/each}
			{:else}
				No Applicants
			{/if}
		{:else if $applicantsStore.applicants.loading}
			<Circle color="#258cf4" size={30} />
		{:else if !$applicantsStore.applicants.loading && $applicantsStore.applicants.error.status !== 200}
			{$applicantsStore.applicants.error.message}
		{/if}
	</div>
</div>
{#if loaded}
	<ApplicantModal applicant={selectedApplicant} on:close={handleApplicantModalClose} />
{/if}

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.applicants {
		background: $background-secondary;
		border-radius: 10px;
		border: 1px solid darken($color: $background, $amount: 5);
		padding: 1.5rem;
		height: min-content;
		width: 300px;

		@media screen and (max-width: 860px) {
			margin-top: 1rem;
			width: calc(100% - 3rem);
		}

		::-webkit-scrollbar {
			width: 5px;
			height: 5px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: transparent;
			border-radius: 6px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: darken($color: $background, $amount: 15);
			border-radius: 6px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: darken($color: $background, $amount: 10);
		}

		h2 {
			margin-top: 0;
			font-size: 1.3rem;
		}

		.list {
			display: grid;
			grid-auto-flow: row;
			gap: 0.4rem;
			min-height: 100px;
			max-height: 70vh;
			overflow: hidden visible;

			&.error,
			&.loading {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
