<script lang="ts">
	import type { Applicant } from '$types/applicants';

	import { createEventDispatcher } from 'svelte';

	export let applicant: Applicant;

	const dispatch = createEventDispatcher();

	const handleApplicantClick = () => {
		dispatch('select', applicant.id);
	};
</script>

<div class="applicant" on:click={handleApplicantClick}>
	<span class="name">{applicant.first_name}</span>
	<span class="email">{applicant.email}</span>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.applicant {
		display: flex;
		flex-flow: column;
		padding: 1rem;
		border-radius: 10px;
		cursor: pointer;
		height: min-content;

		&:hover {
			background: $background;
		}
	}
</style>
