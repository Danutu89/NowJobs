<script lang="ts">
	export let job;
</script>

<card>
	<img
		src="https://media-exp1.licdn.com/dms/image/C4D0BAQEHS3GdQrCeJQ/company-logo_100_100/0/1593371759344?e=1626307200&v=beta&t=qQRaTIeJGAon9ScM6K6W_Lt93vEXL7vwyjj8U8-8srs"
		alt="job"
		width="30px"
		height="30px"
	/>
	<div class="info">
		<a href="#" class="title">Android Developer</a>
		<div class="location">
			icon Iasi,Romania
			<div class="remote">Remote</div>
		</div>
	</div>
</card>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	card {
		display: flex;
		flex-flow: row;
		align-items: center;
		padding: 0.4rem 0;

		.info {
			display: flex;
			flex-flow: column;
			color: $font-color;
			font-size: 12px;
			margin-left: 0.4rem;

			.title {
				color: $font-color-full;
				text-decoration: underline;
			}

			.location {
				display: flex;
				flex-flow: row;

				.remote {
					margin-left: 0.3rem;
					border-radius: 10px;
					background: $secondary-color;
					color: $font-color-on-color;
					font-weight: 700;
					font-size: 10px;
					padding: 0.1rem 0.4rem;
					width: min-content;
				}
			}
		}
	}
</style>
