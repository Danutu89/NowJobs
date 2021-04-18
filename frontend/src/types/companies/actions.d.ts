import type { Option } from '$vendor/mase/Select/types/option';
import type { Action } from '$vendor/sedux/types/action';

export interface GetCompanies extends Action {
	search?: string;
}

export interface GotCompanies extends Action {
	results: Array<Option>;
}

export interface GetCompaniesFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
