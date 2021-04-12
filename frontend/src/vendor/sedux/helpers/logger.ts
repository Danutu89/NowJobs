import { get } from 'svelte/store';
import { mainStore } from '../store';
import type { Calls } from '../types/calls';

let devTools = null;

export const initDevTools = (): void => {
	devTools =
		window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'].connect();
};

export const actionsLogger = (state: Calls): void => {
	if (state.prevCalled)
		devTools.send(
			state.nextCalled.type.toString(),
			get(get(mainStore)[state.nextCalled.name].state)
		);

	console.group(`%c Action`, 'color: white');
	console.log(`%c prev call`, 'color: #9E9E9E', state.prevCalled);
	console.log(
		`%c current state`,
		'color: #03A9F4',
		state.nextCalled ? get(get(mainStore)[state.nextCalled.name].state) : null
	);
	console.log(`%c next call`, 'color: #4CAF50', state.nextCalled);
	console.groupEnd();
};
