import type { Option } from '$vendor/mase/Select/types/option';

export interface Company {
	name: string;
	id: string;
	icon: string;
}

export interface State {
	companies: {
		results: Array<Option>;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
}
