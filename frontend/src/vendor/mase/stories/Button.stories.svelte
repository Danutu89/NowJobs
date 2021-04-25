<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from '../Button.svelte';
</script>

<Meta
	title="Button"
	component={Button}
	argTypes={{
		color: {
			control: { type: 'select', options: ['primary', 'default', 'secondary'] }
		},
		onClick: { action: 'onClick' }
	}}
/>

<Template let:args>
	<Button {...args} on:click={args.onClick}>Button</Button>
</Template>

<Story
	name="Primary"
	args={{
		color: 'primary'
	}}
/>

<Story
	name="Secondary"
	args={{
		color: 'secondary'
	}}
/>
<Story
	name="Default"
	args={{
		color: 'default'
	}}
/>
