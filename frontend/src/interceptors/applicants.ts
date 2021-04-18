import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { Response } from '$types/response';
import type { GetApplicant, GetApplicants } from '$types/applicants/actions';
import type { Applicant } from '$types/applicants';
import {
	getApplicantFailed,
	getApplicantsFailed,
	gotApplicant,
	gotApplicants
} from '$actions/applicants';
import { GET_APPLICANT, GET_APPLICANTS } from '$constants/applicants';

const getApplicants = async ({ job, name }: GetApplicants): Promise<void> => {
	try {
		const res = await request.get('/api/jobs/applicants', { job });
		const json: Response<Array<Applicant>> = await res.json();
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

			return dispatch(() => getApplicantsFailed({ status: res.status, message: error }, name));
		}
		return dispatch(() => gotApplicants(json, name));
	} catch (error) {
		return dispatch(() => getApplicantsFailed({ status: 500, message: error }, name));
	}
};

const getApplicant = async ({ id, name }: GetApplicant): Promise<void> => {
	try {
		const res = await request.get(`/api/jobs/applicants/${id}`);
		const json: Response<Applicant> = await res.json();
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

			return dispatch(() => getApplicantFailed({ status: res.status, message: error }, name));
		}
		return dispatch(() => gotApplicant(json, name));
	} catch (error) {
		return dispatch(() => getApplicantFailed({ status: 500, message: error }, name));
	}
};

export function applicantsInterceptor(action: Value): void {
	switch (action.type) {
		case GET_APPLICANTS:
			getApplicants(action);
			break;
		case GET_APPLICANT:
			getApplicant(action);
			break;
		default:
			break;
	}
}
