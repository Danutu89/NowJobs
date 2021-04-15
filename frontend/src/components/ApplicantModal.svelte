<script lang="ts">
	import { Modal } from '$vendor/mase';
	import Button from '$vendor/mase/Button.svelte';
	import Circle from '$vendor/mase/Spinners/Circle.svelte';

	export let applicant: number = -1;

	let opened: boolean = applicant != -1;
	let loading = false;

	$: opened = applicant != -1;
</script>

<Modal {opened} on:close>
	{#if loading}
		<Circle color="#258cf4" size={30} />
	{:else}
		<div class="main">
			<div class="header">
				<h2>Daniel Ionut</h2>
			</div>
			<div class="body">
				<h4>Data:</h4>
				<div class="group">
					<span class="name">Full Name:</span> <span class="value">Daniel Ionut Grigoras</span>
				</div>
				<div class="group">
					<span class="name">Email:</span> <span class="value">dany89yt@yahoo.com</span>
				</div>
				<div class="group">
					<span class="name">Phone:</span> <span class="value">5438759873985</span>
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
