import type { GetCompanies, GetCompaniesFailed, GotCompanies } from '$types/companies/actions';
import { GET_COMPANIES, GET_COMPANIES_FAILED, GOT_COMPANIES } from '$constants/companies';
import type { Option } from '$vendor/mase/Select/types/option';

export const getCompanies = (name: string, domain?: string, search = ''): GetCompanies => {
	return {
		type: GET_COMPANIES,
		name,
		search
	};
};

export const gotCompanies = (results: Array<Option>, name: string): GotCompanies => {
	return {
		type: GOT_COMPANIES,
		name,
		results
	};
};

export const getCompaniesFailed = (
	error: { status: number; message: string },
	name: string
): GetCompaniesFailed => {
	return {
		type: GET_COMPANIES_FAILED,
		error,
		name
	};
};
