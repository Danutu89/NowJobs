<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { callsStore, queue } from './store';
	import { reducerCatcher, interceptorCatcher, listenerCatcher, updateQueue } from './dispatcher';
	import { actionsLogger, initDevTools } from './helpers/logger';
	import { dev } from '$app/env';
	import type { Unsubscriber } from 'svelte/store';

	let unsubscribeCalls: Unsubscriber | null = null;

	onMount(() => {
		if (dev) initDevTools();

		unsubscribeCalls = callsStore.subscribe((value) => {
			if (dev && value.nextCalled) actionsLogger(value);
			updateQueue();
			reducerCatcher(value);
			interceptorCatcher(value);
			listenerCatcher(value);
		});

		queue.subscribe(() => {
			updateQueue();
		});
	});

	onDestroy(() => {
		if (unsubscribeCalls) unsubscribeCalls();
	});
</script>

<slot />
