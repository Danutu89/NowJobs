import { callsStore, mainStore } from './store';
import { syncMainState, syncPersist } from './persist';
import { get } from 'svelte/store';
import type { Action, Slicer } from './types/action';
import type { Storex, Value } from './types/storex';

/**
 * @param interceptor
 * @param reducer
 * @param name
 * @param state
 */
export function createSlicer(
	interceptor: (action: Action) => void | null,
	reducer: (nextCalled: Action, state: Value) => Value,
	name: string,
	state: Storex<Value>,
	persist: boolean | string = false
): Slicer {
	if (!reducer || !state || !name) return;

	mainStore.update((prevState) => ({
		...prevState,
		[name]: {
			reducer,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			interceptor: interceptor ? interceptor : () => {},
			state,
			persist
		}
	}));

	if (persist) syncMainState(name);

	state.subscribe((value) => {
		syncPersist(name, value);

		callsStore.update((prevState) => ({
			...prevState,
			called: prevState.nextCalled,
			nextCalled: null
		}));
	});

	const store = get(mainStore);

	const destroy = () => {
		store[name].state.reset();
		delete store[name];
		mainStore.set(store);
	};

	return {
		reset: store[name].state.reset,
		subscribe: mainStore.subscribe,
		destroy
	};
}
