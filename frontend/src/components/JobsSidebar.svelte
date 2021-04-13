<script lang="ts">
	import type { SearchJob } from '$types/search';

	import { Select } from '$vendor/mase';

	export let filters: SearchJob;
</script>

<sidebar>
	<span class="header"> Filters </span>
	<div class="filter">
		<span>Company</span>
		<Select
			options={[
				{ value: 1, text: 'danutu' },
				{ value: 2, text: 'ionut' }
			]}
			placeholder="Search"
			bind:value={filters.company}
		/>
	</div>
	<div class="filter">
		<span>Domain</span>
		<Select
			options={[
				{ value: 1, text: 'danutu' },
				{ value: 2, text: 'ionut' }
			]}
			placeholder="Search"
			bind:value={filters.domain}
		/>
	</div>
	<div class="filter">
		<span>Date of posting</span>
		<div class="radio">
			<input id="radio-1" name="radio" type="radio" />
			<label for="radio-1" class="radio-label">Last day</label>
		</div>
		<div class="radio">
			<input id="radio-2" name="radio" type="radio" />
			<label for="radio-2" class="radio-label">Last two days</label>
		</div>
		<div class="radio">
			<input id="radio-3" name="radio" type="radio" />
			<label for="radio-3" class="radio-label">Last week</label>
		</div>
		<div class="radio">
			<input id="radio-4" name="radio" type="radio" />
			<label for="radio-4" class="radio-label">Last month</label>
		</div>
	</div>
	<div class="filter">
		<span>Location</span>
		<div class="radio">
			<input id="radio-11" name="location" type="radio" />
			<label for="radio-11" class="radio-label">Any</label>
		</div>
		<div class="radio">
			<input id="radio-12" name="location" type="radio" />
			<label for="radio-12" class="radio-label">Remote</label>
		</div>
	</div>
</sidebar>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	sidebar {
		width: 400px;
		background: $background-secondary;
		display: flex;
		flex-flow: column;
		height: calc(100vh - 50px - 2rem);
		position: -webkit-sticky;
		position: sticky;
		top: 50px;
		padding: 1rem;

		.header {
			font-weight: 700;
			font-size: 2rem;
			margin-block-start: calc(0.67em - 1rem);
			margin-block-end: 0.67em;
			margin-inline-start: 0px;
			margin-inline-end: 0px;
			font-weight: bold;
		}

		.filter {
			display: flex;
			flex-flow: column;
			margin-bottom: 1rem;

			span {
				font-weight: 600;
				font-size: 1.2rem;
				margin-bottom: 0.5rem;
			}

			.radio {
				margin: 0.4rem;
				cursor: pointer;
				input[type='radio'] {
					position: absolute;
					opacity: 0;
					+ .radio-label {
						cursor: pointer;
						color: $font-color;
						font-size: 15px;
						&:before {
							content: '';
							background: $background;
							border-radius: 100%;
							border: 1px solid darken($background, 15%);
							display: inline-block;
							width: 1em;
							height: 1em;
							position: relative;
							margin-right: 0.4rem;
							vertical-align: top;
							cursor: pointer;
							text-align: center;
							transition: all 250ms ease;
						}
					}
					&:checked {
						+ .radio-label {
							&:before {
								background-color: $background;
								box-shadow: inset 0 0 0 4px $secondary-color;
							}
						}
					}
					&:focus {
						+ .radio-label {
							&:before {
								outline: none;
								border-color: $background;
							}
						}
					}
					&:disabled {
						+ .radio-label {
							&:before {
								box-shadow: inset 0 0 0 4px $background;
								border-color: darken($background, 25%);
								background: darken($background, 25%);
							}
						}
					}
					+ .radio-label {
						&:empty {
							&:before {
								margin-right: 0;
							}
						}
					}
				}
			}
		}
	}
</style>
