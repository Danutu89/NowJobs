import type { Action } from './action';
import type { Storex } from './storex';

export interface Logic {
	reducer: (nextCalled: Action, state: Record<string, unknown>) => Record<string, unknown>;
	interceptor: (action: Action) => void;
	state: Storex;
	persist: string | null | boolean;
	_persistLoaded?: boolean = false;
}
