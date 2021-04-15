<script lang="ts">
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import ApplicantModal from './ApplicantModal.svelte';
	import JobApplicant from './JobApplicant.svelte';

	export let applicants: Array<any> = new Array(20),
		loading: boolean = false,
		error: string = '';

	let selectedApplicant: number = -1;

	const handleApplicantSelect = ({ detail }): void => {
		selectedApplicant = 1;
	};

	const handleApplicantModalClose = (): void => {
		selectedApplicant = -1;
	};
</script>

<div class="applicants">
	<h2>Applicants</h2>
	<div class="list" class:loading class:error>
		{#if !loading}
			{#if applicants.length > 0}
				{#each applicants as applicant}
					<JobApplicant {applicant} on:select={handleApplicantSelect} />
				{/each}
			{:else}
				No Applicants
			{/if}
		{:else if loading}
			<Circle color="#258cf4" size={30} />
		{:else if !loading && error}
			{error}
		{/if}
	</div>
</div>
<ApplicantModal applicant={selectedApplicant} on:close={handleApplicantModalClose} />

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.applicants {
		background: $background-secondary;
		border-radius: 10px;
		border: 1px solid darken($color: $background, $amount: 5);
		padding: 1.5rem;
		height: min-content;
		width: 300px;

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
