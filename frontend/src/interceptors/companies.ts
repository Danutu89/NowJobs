import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import { GET_COMPANIES } from '$constants/companies';
import type { GetCompanies } from '$types/companies/actions';
import { getCompaniesFailed, gotCompanies } from '$actions/companies';
import type { Response } from '$types/response';
import type { Option } from '$vendor/mase/Select/types/option';
import type { Company } from '$types/companies';

const getCompanies = async ({ search, name }: GetCompanies): Promise<void> => {
	try {
		const res = await request.get('/api/users/companies', { search });
		const json: Response<Array<Company>> = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details;
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => getCompaniesFailed({ status: res.status, message: error }, name));
		}
		const parsed: Array<Option> = json.map((company) => ({
			value: company.id,
			text: company.name
		}));
		return dispatch(() => gotCompanies(parsed, name));
	} catch (error) {
		return dispatch(() => getCompaniesFailed({ status: 500, message: error }, name));
	}
};

export function companiesInterceptor(action: Value): void {
	switch (action.type) {
		case GET_COMPANIES:
			getCompanies(action);
			break;
		default:
			break;
	}
}
