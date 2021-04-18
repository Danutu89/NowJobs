import type { Option } from '$vendor/mase/Select/types/option';
import type { Action } from '$vendor/sedux/types/action';

export interface GetDomains extends Action {
	search?: string;
}

export interface GotDomains extends Action {
	results: Array<Option>;
}

export interface GetDomainsFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
