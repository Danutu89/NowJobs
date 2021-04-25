<script lang="ts">
	import { appStore } from '$stores/app';

	import type { Job } from '$types/jobs';

	import { Button } from '$vendor/mase';
	import Segment from '$vendor/mase/Segment.svelte';
	import Circle from '$vendor/mase/Spinners/Circle.svelte';
	import Error from '../routes/$error.svelte';
	import JobApplyCard from './JobApplyCard.svelte';

	export let loading = true,
		result: Job,
		error: {
			status: number;
			message: string;
		};
</script>

<Segment>
	<div class="card" class:loading class:error={error.status !== 200}>
		{#if loading && error.status === 200}
			<Circle color="#258cf4" size={30} />
		{:else if !loading && error.status !== 200}
			<Error status={error.status} {error} />
		{:else if !loading && error.status === 200}
			<div class="header">
				<h1 class="title">{result.title}</h1>

				<div class="details">
					<div class="location">icon Iasi,Romania</div>
					{#if result.remote}
						<div class="remote">Remote</div>
					{/if}
				</div>
			</div>
			<hr />
			<div class="description">
				{result.description}
			</div>

			{#if !result.permissions?.write}
				{#if $appStore.user.loggedIn && $appStore.user.data?.completed}
					<hr />
					<Button
						styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);"
						centered
						color="secondary">Fast Apply</Button
					>
				{:else}
					<hr />
					<JobApplyCard />
				{/if}
			{/if}
		{/if}
	</div>
</Segment>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.card {
		margin-right: 1rem;
		width: 800px;
		height: min-content;

		@media screen and (max-width: 1280px) {
			width: 100%;
		}

		@media screen and (max-width: 860px) {
			margin-right: 0;
		}

		@media screen and (max-width: 680px) {
			margin: auto;
		}

		&.loading,
		&.error {
			display: flex;
			justify-content: center;
			align-items: center;
			height: auto;
		}

		.header {
			.title {
				margin: 0;
			}

			.details {
				display: flex;
				flex-flow: column;
				margin-top: 1rem;

				& > div {
					margin-bottom: 0.4rem;
				}

				.location {
					color: $font-color;
				}

				.remote {
					border-radius: 10px;
					background: $secondary-color;
					color: $font-color-on-color;
					font-weight: 700;
					font-size: 13px;
					padding: 0.2rem 0.8rem;
					width: min-content;
				}
			}
		}

		.description {
			overflow-wrap: break-word;
		}

		hr {
			border: 1px solid darken($color: $background, $amount: 5);
			width: calc(100% + 3rem);
			margin: 1rem 0;
			margin-left: -1.5rem;
		}
	}
</style>
