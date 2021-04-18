import type { Option } from '$vendor/mase/Select/types/option';

export interface Domain {
	name: string;
	id: string;
}

export interface State {
	domains: {
		results: Array<Option>;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
}
