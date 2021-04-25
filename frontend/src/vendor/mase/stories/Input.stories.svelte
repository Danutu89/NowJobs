<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Input from '../Input.svelte';
</script>

<Meta title="Input" component={Input} argTypes={{}} />

<Template let:args>
	<Input {...args} on:click={args.onClick} />
</Template>

<Story name="Default" />
