<script lang="ts">
	import Circle from '$vendor/mase/Spinners/Circle.svelte';

	export let company,
		loading = false,
		error = '';
</script>

<div class="company">
	<h2>Company</h2>
	<div class="details" class:loading class:error>
		{#if !loading}
			<div class="header">
				<img
					src="https://media-exp1.licdn.com/dms/image/C4D0BAQEHS3GdQrCeJQ/company-logo_100_100/0/1593371759344?e=1626307200&v=beta&t=qQRaTIeJGAon9ScM6K6W_Lt93vEXL7vwyjj8U8-8srs"
					alt="company"
					width="60px"
					height="60px"
				/>
				<span class="title">NewApp</span>
			</div>
			<div class="locations">
				<div class="location">icon Iasi,Romania</div>
				<div class="location">icon Bucharest,Romania</div>
			</div>
			<div class="employes">icon 40</div>
			<div class="departments">
				<span class="department">Web Development</span>
				<span class="department">CyberSecurity</span>
			</div>
		{:else if loading}
			<Circle color="#258cf4" size={30} />
		{:else if !loading && error}
			{error}
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';
	.company {
		background: $background-secondary;
		border-radius: 10px;
		border: 1px solid darken($color: $background, $amount: 5);
		padding: 1.5rem;
		height: min-content;
		width: 250px;

		@media screen and (max-width: 750px) {
			width: calc(100% - 3rem);
		}

		h2 {
			font-size: 1.3rem;
			margin-top: 0;
		}

		.details {
			min-height: 100px;
			display: flex;
			flex-flow: column;

			&.error,
			&.loading {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.header {
				display: flex;
				flex-flow: row;
				align-items: center;

				@media screen and (max-width: 750px) {
					flex-flow: column;
				}

				img {
					border-radius: 40px;
				}

				.title {
					margin-left: 0.8rem;
					font-size: 16px;
					font-weight: 700;

					@media screen and (max-width: 750px) {
						margin-left: 0;
						margin-top: 1rem;
						font-size: 20px;
					}
				}
			}

			.locations {
				display: flex;
				flex-flow: column;
				margin-top: 1rem;

				.location {
					color: $font-color;
					font-size: 14px;

					@media screen and (max-width: 750px) {
						font-size: 16px;
					}
				}
			}

			.employes {
				display: flex;
				flex-flow: row;
				color: $font-color;
				font-size: 14px;
				margin-top: 0.4rem;
				@media screen and (max-width: 750px) {
					font-size: 16px;
				}
			}

			.departments {
				margin-top: 0.4rem;
				display: flex;
				flex-flow: column;

				.department {
					margin-top: 0.2rem;
					color: $font-color;
					font-size: 12px;
					@media screen and (max-width: 750px) {
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
