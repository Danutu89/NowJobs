import { mainStore, listenersStore, callsStore, queue } from './store';
import { get } from 'svelte/store';
import type { Action, ActionVoid } from './types/action';
import type { Queue } from './helpers/queue';
import type { Calls } from './types/calls';
import type { Value } from './types/storex';

const dispatch = (action: ActionVoid | Action): void => {
	const action_: Action = typeof action === 'function' ? action() : action;

	if (!(action_.name in get(mainStore))) {
		console.error('Logic name not valid.');
		return;
	}

	if (get(callsStore).nextCalled === null) {
		callsStore.update((prevState) => ({
			...prevState,
			nextCalled: action_
		}));
		return;
	}

	addQueue(action_);
};

const timedDispatch = (action: Action, time: number): void => {
	setTimeout(() => dispatch(action), time * 60 * 1000);
};

const addQueue = (action: Action) => {
	const q: Queue = get(queue);

	q.enqueue(action);

	queue.set(q);
};

const removeQueue = () => {
	const q: Queue = get(queue);

	const res: Action = q.dequeue();

	queue.set(q);

	return res;
};

const updateQueue = (): void => {
	if (get(queue).isEmpty()) return;
	if (get(callsStore).nextCalled !== null) return;

	const action: Action = removeQueue();
	callsStore.update((prevState) => ({
		...prevState,
		nextCalled: action
	}));
};

const reducerCatcher = ({ nextCalled, called }: Calls): void => {
	if (nextCalled === null) return;
	if (called !== null || (called && called.type === nextCalled.type)) return;
	const app = get(mainStore)[nextCalled.name];

	const state: Value = { ...get(app.state) };

	const result = app.reducer(nextCalled, state);

	app.state.update((prevState) => ({
		...prevState,
		...result
	}));
};

const interceptorCatcher = ({ nextCalled, called }: Calls): void => {
	if (called === null) return;
	if (nextCalled !== null && nextCalled.type === called.type) return;

	const app = get(mainStore)[called.name];

	callsStore.update((prevState) => {
		return {
			...prevState,
			prevCalled: prevState.called,
			called: null
		};
	});

	app.interceptor(called);
};

const listenerCatcher = ({ called }: { called: Action }): void => {
	if (called === null) return;

	get(listenersStore).map((item) => {
		if (typeof item.actionType === 'object') {
			if (item.actionType.includes(called.type)) item.callback(called);
		} else {
			if (item.actionType === called.type) item.callback(called);
		}
		return;
	});
};

export {
	reducerCatcher,
	interceptorCatcher,
	listenerCatcher,
	dispatch,
	timedDispatch,
	updateQueue
};
