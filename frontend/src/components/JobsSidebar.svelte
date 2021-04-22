<script lang="ts">
	import { getJobs } from '$actions/jobs';

	import type { Filters } from '$types/jobs';
	import Button from '$vendor/mase/Button.svelte';
	import MediaQuery from '$vendor/mase/utils/MediaQuery.svelte';

	import { dispatch } from '$vendor/sedux';
	import CategorySelect from './CategorySelect.svelte';
	import CompanySelect from './CompanySelect.svelte';
	import DomainSelect from './DomainSelect.svelte';

	export let filters: Filters;
	export let opened = true;

	const handleChange = () => {
		dispatch(() => getJobs(filters, 'jobs'));
	};

	const getCreatedOnDate = (days: number): string => {
		const date = new Date();
		date.setUTCDate(date.getUTCDate() - days);
		date.setUTCHours(0);
		date.setUTCMinutes(0);
		date.setUTCSeconds(0);
		date.setUTCMilliseconds(0);

		return date.toISOString();
	};
</script>

<sidebar class:opened>
	<span class="header"> Filters </span>
	<div class="filter">
		<span>Company</span>
		<CompanySelect bind:value={filters.company} on:select={handleChange} />
	</div>
	<div class="filter">
		<span>Domain</span>
		<DomainSelect bind:value={filters.domain} on:select={handleChange} />
	</div>
	<div class="filter">
		<span>Category</span>
		<CategorySelect bind:value={filters.category} on:select={handleChange} />
	</div>
	<div class="filter">
		<span>Date of posting</span>
		<div class="radio">
			<input
				id="radio-1"
				bind:group={filters.created_on}
				value={getCreatedOnDate(1)}
				on:change={handleChange}
				name="radio"
				type="radio"
			/>
			<label for="radio-1" class="radio-label">Last day</label>
		</div>
		<div class="radio">
			<input
				id="radio-2"
				bind:group={filters.created_on}
				value={getCreatedOnDate(7)}
				on:change={handleChange}
				name="radio"
				type="radio"
			/>
			<label for="radio-2" class="radio-label">Last week</label>
		</div>
		<div class="radio">
			<input
				id="radio-3"
				bind:group={filters.created_on}
				value={getCreatedOnDate(30)}
				on:change={handleChange}
				name="radio"
				type="radio"
			/>
			<label for="radio-3" class="radio-label">Last month</label>
		</div>
		<div class="radio">
			<input
				id="radio-4"
				bind:group={filters.created_on}
				value={getCreatedOnDate(60)}
				on:change={handleChange}
				name="radio"
				type="radio"
			/>
			<label for="radio-4" class="radio-label">Last 2 months</label>
		</div>
	</div>
	<div class="filter">
		<span>Location</span>
		<div class="radio">
			<input
				id="radio-11"
				bind:group={filters.remote}
				on:change={handleChange}
				name="location"
				type="radio"
				value="null"
			/>
			<label for="radio-11" class="radio-label">Any</label>
		</div>
		<div class="radio">
			<input
				id="radio-12"
				bind:group={filters.remote}
				on:change={handleChange}
				name="location"
				type="radio"
				value="true"
			/>
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
		z-index: 2;
		max-height: 0px;
		overflow: hidden visible;

		@media screen and (max-width: 860px) {
			position: initial;
			width: calc(100% - 4rem);
			background: $background-secondary;
			border-radius: 10px;
			height: fit-content;
			padding-right: 0;
			max-height: 0px;
		}

		&.opened {
			max-height: 9999px;
			padding: 1rem;

			@media screen and (max-width: 860px) {
				margin-left: 1rem;
				margin-top: 1rem;
			}
		}

		.header {
			font-weight: 700;
			font-size: 2rem;
			margin-block-start: calc(0.67em - 1rem);
			margin-block-end: 0.67em;
			margin-inline-start: 0px;
			margin-inline-end: 0px;
			font-weight: bold;

			@media screen and (max-width: 860px) {
				display: none;
			}
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
