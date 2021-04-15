import { Writable, writable } from 'svelte/store';
import { Queue } from './helpers/queue';
import type { Calls } from './types/calls';
import type { Listener } from './types/listener';
import type { Logic } from './types/logic';
import type { Storex, Value } from './types/storex';

const callsStore: Writable<Calls> = writable({
	prevCalled: null,
	called: null,
	nextCalled: null
});

const listenersStore: Writable<Listener[] | []> = writable([]);

const mainStore: Writable<Record<string, Logic>> = writable({});

const queue: Writable<Queue> = writable(new Queue());

const storex = <Value>(initialState: Value): Storex<Value> => {
	const initial = JSON.stringify(initialState);
	const { subscribe, set, update }: Writable<Value> = writable<Value>(initialState);

	const reset = (): void => {
		set(JSON.parse(initial));
	};

	return {
		subscribe,
		reset,
		set,
		update
	};
};

export { mainStore, listenersStore, callsStore, queue, storex };
