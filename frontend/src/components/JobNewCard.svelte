<script lang="ts">
	import { Input, TextArea, Button, Select } from '$vendor/mase';
</script>

<div class="card">
	<div class="header">
		<h1 class="title">New Job</h1>
	</div>
	<div class="info">
		<Input
			name="title"
			placeholder="Position"
			fluid
			style="padding: 0.4rem 0.8rem;font-size: 19px;width: calc(100% - 1.6rem);"
			pattern={/^[a-zA-Z_ ]{4,200}$/}
		/>
		<div class="group">
			<Input
				style="padding: 0.4rem 0.8rem;font-size: 19px;width: calc(100% - 1.6rem);"
				fluid
				name="email-hr"
				placeholder="HR Email"
				pattern={/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+).([a-zA-Z]{2,5})$/}
			/>
			<Input
				style="padding: 0.4rem 0.8rem;font-size: 19px;width: calc(100% - 1.6rem);"
				fluid
				name="company"
				placeholder="Company Name"
				pattern={/^[a-zA-Z0-9_ ]{2,200}$/}
			/>
		</div>
		<div class="group">
			<Input
				style="padding: 0.4rem 0.8rem;font-size: 19px;width: calc(100% - 1.6rem);"
				fluid
				name="salary"
				placeholder="Salary (Optional)"
				pattern={/^[0-9.,]{0,10}$/}
			/>
			<Input
				style="padding: 0.4rem 0.8rem;font-size: 19px;width: calc(100% - 1.6rem);"
				fluid
				name="required"
				placeholder="Required"
				pattern={/^[0-9]{0,10}$/}
			/>
		</div>
		<Select
			options={[
				{ value: 1, text: 'Iasi, Romania' },
				{ value: 2, text: 'Bucharest, Romania' }
			]}
			placeholder="Location"
			style="padding: 0.4rem 0.8rem;font-size: 19px;margin: 0.8rem 0;width: calc(100% - 1.6rem);"
		/>
		<TextArea placeholder="Description" rows={15} />
	</div>
	<Button
		styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);"
		centered
		color="secondary">Post</Button
	>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.card {
		margin-right: 1rem;
		width: 800px;
		background: $background-secondary;
		border-radius: 10px;
		border: 1px solid darken($color: $background, $amount: 5);
		padding: 1rem 2rem;

		@media screen and (max-width: 1280px) {
			width: calc(100% - 4rem);
		}

		@media screen and (max-width: 860px) {
			margin-right: 0;
		}

		@media screen and (max-width: 680px) {
			margin: auto;
		}

		.header {
			.title {
				margin: 0;
			}
		}
		.info {
			display: flex;
			flex-flow: column;
			margin: 1rem 0;

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
	}
</style>
