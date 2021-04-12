import type { Action } from './action';

export interface Calls {
	nextCalled: Action;
	called: Action;
	prevCalled: Action;
}
