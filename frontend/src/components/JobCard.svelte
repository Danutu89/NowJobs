<script lang="ts">
	import Button from '$vendor/mase/Button.svelte';

	export let job: unknown;
</script>

<card>
	<div class="header">
		<img
			src="https://media-exp1.licdn.com/dms/image/C4D0BAQEHS3GdQrCeJQ/company-logo_100_100/0/1593371759344?e=1626307200&v=beta&t=qQRaTIeJGAon9ScM6K6W_Lt93vEXL7vwyjj8U8-8srs"
			alt="job"
			width="30px"
			height="30px"
		/>
		<span class="title">Javascript Developer</span>
	</div>
	<div class="location">
		icon <span class="name">Iasi, Romania</span>
	</div>
	<div class="description">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, odio beatae quis ullam
		assumenda repudiandae hic dignissimos aliquam nihil ipsam aliquid quod dolorem, vero consequatur
		corrupti numquam...
	</div>
	<div class="attributes">
		<span class="category">Web Development</span>
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
