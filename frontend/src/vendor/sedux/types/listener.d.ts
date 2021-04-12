import type { Action } from './action';

export interface Listener {
	actionType: symbol | symbol[];
	callback: (action: Action) => void;
}
