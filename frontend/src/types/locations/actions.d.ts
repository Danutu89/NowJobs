import type { Option } from '$vendor/mase/Select/types/option';
import type { Action } from '$vendor/sedux/types/action';

export interface GetLocations extends Action {
	search?: string;
}

export interface GotLocations extends Action {
	results: Array<Option>;
}

export interface GetLocationsFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
