import { callsStore, mainStore } from './store';
import { syncMainState, syncPersist } from './persist';
import { get, Writable } from 'svelte/store';
import type { Action } from './types/action';
import type { Storex } from './types/storex';

/**
 * @param interceptor
 * @param reducer
 * @param name
 * @param state
 */
export function addReducerAndInterceptors(
	interceptor: (action: Action) => void | null,
	reducer: (nextCalled: Action, state: Record<string, unknown>) => Record<string, unknown>,
	name: string,
	state: Storex,
	persist: boolean | string = false
): {
	reset: void;
	subscribe: Writable<unknown>['subscribe'];
	destroy: () => void;
} {
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

	state.subscribe(() => {
		syncPersist(name);

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
		reset: store[name].state.reset(),
		subscribe: mainStore.subscribe,
		destroy
	};
}
