import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { GetDomains } from '$types/domains/actions';
import type { Response } from '$types/response';
import { getDomainsFailed, gotDomains } from '$actions/domains';
import { GET_DOMAINS } from '$constants/domains';
import type { Option } from '$vendor/mase/Select/types/option';
import type { Domain } from '$types/domains';

const getDomains = async ({ search, name }: GetDomains): Promise<void> => {
	try {
		const res = await request.get('/api/jobs/domains', { search });
		const json: Response<Array<Domain>> = await res.json();
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

			return dispatch(() => getDomainsFailed({ status: res.status, message: error }, name));
		}
		const parsed: Array<Option> = json.map((company) => ({
			value: company.id,
			text: company.name
		}));
		return dispatch(() => gotDomains(parsed, name));
	} catch (error) {
		return dispatch(() => getDomainsFailed({ status: 500, message: error }, name));
	}
};

export function domainsInterceptor(action: Value): void {
	switch (action.type) {
		case GET_DOMAINS:
			getDomains(action);
			break;
		default:
			break;
	}
}
