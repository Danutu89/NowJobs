import { GET_DOMAINS, GET_DOMAINS_FAILED, GOT_DOMAINS } from '$constants/domains';
import type { GetDomains, GetDomainsFailed, GotDomains } from '$types/domains/actions';
import type { Option } from '$vendor/mase/Select/types/option';

export const getDomains = (name: string, search = ''): GetDomains => {
	return {
		type: GET_DOMAINS,
		name,
		search
	};
};

export const gotDomains = (results: Array<Option>, name: string): GotDomains => {
	return {
		type: GOT_DOMAINS,
		name,
		results
	};
};

export const getDomainsFailed = (
	error: { status: number; message: string },
	name: string
): GetDomainsFailed => {
	return {
		type: GET_DOMAINS_FAILED,
		error,
		name
	};
};
