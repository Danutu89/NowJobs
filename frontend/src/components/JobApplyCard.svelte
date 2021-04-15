<script lang="ts">
	import { Input, TextArea, Button } from '$vendor/mase';
</script>

<div class="apply">
	<div class="group">
		<Input style="padding: 0.6rem 0.4rem;" fluid name="first_name" placeholder="First Name" />
		<Input style="padding: 0.6rem 0.4rem;" fluid name="last_name" placeholder="Last Name" />
	</div>
	<div class="group">
		<Input style="padding: 0.6rem 0.4rem;" fluid name="email" placeholder="Email" />
		<Input style="padding: 0.6rem 0.4rem;" fluid name="phone" placeholder="Phone" />
	</div>
	<TextArea rows={5} placeholder="Additional Notes" style="margin-top: 0.8rem;" />
	<div class="group">
		<Button
			styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);"
			centered
			color="secondary">Add CV</Button
		>
		<Button
			styles="padding: 0.6rem 2rem;border-radius: 20px;width: calc(100% - 4rem);margin-left: 0.8rem;"
			centered
			color="secondary">Apply</Button
		>
	</div>
</div>

<style lang="scss">
	@import '../src/vendor/mase/globals.scss';

	.apply {
		display: flex;
		flex-flow: column;

		.group {
			display: flex;
			flex-flow: row;
			margin-top: 0.8rem;
		}
	}
</style>
