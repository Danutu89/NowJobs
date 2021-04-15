<script lang="ts">
	import type { Job } from '$types/jobs';

	import Button from '$vendor/mase/Button.svelte';

	export let job: Job;
</script>

<card>
	<div class="header">
		{#if job.owner.icon}
			<img src={job.owner.icon} alt="job" width="30px" height="30px" />
		{/if}
		<a href="/jobs/fdf-5" class="title">{job.title}</a>
		{#if job.remote}
			<div class="remote">Remote</div>
		{/if}
	</div>
	<div class="location">
		icon <span class="name">Iasi, Romania</span>
	</div>
	<div class="description">
		{job.description}...
	</div>
	<div class="attributes">
		<span class="category">{job.category.name}</span>
	</div>
	<div class="actions">
		<Button
			color="secondary"
			styles="border-radius: 10px;padding: 0.3rem 0.5rem;"
			trasparent
			effect
			fluid>Fast Apply</Button
		>
	</div>
</card>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	card {
		display: flex;
		flex-flow: column;
		background: $background-secondary;
		border-radius: 10px;
		box-shadow: 4px 4px 4px 0px rgb(0 0 0 / 20%);
		padding: 0.8rem;

		& > div {
			margin: 0.4rem 0;
		}

		.header {
			display: flex;
			flex-flow: row;
			align-items: center;

			img {
				border-radius: 40px;
			}

			.title {
				margin-left: 0.4rem;
				font-size: 16px;
				font-weight: 700;
				color: $font-color-full;
			}

			.remote {
				border-radius: 10px;
				background: $secondary-color;
				color: $font-color-on-color;
				font-weight: 700;
				font-size: 13px;
				padding: 0.2rem 0.8rem;
				width: min-content;
				margin-inline-start: auto;
			}
		}

		.location {
			color: $font-color;
		}

		.description {
			color: $font-color;
		}

		.attributes {
			.category {
				color: $font-color;
			}
		}
	}
</style>
