import {
	GET_APPLICANT,
	GET_APPLICANTS,
	GET_APPLICANTS_FAILED,
	GET_APPLICANT_FAILED,
	GOT_APPLICANT,
	GOT_APPLICANTS
} from '$constants/applicants';
import type { Applicant } from '$types/applicants';
import type {
	GetApplicant,
	GetApplicantFailed,
	GetApplicants,
	GetApplicantsFailed,
	GotApplicant,
	GotApplicants
} from '$types/applicants/actions';

export const getApplicants = (job: string, name: string): GetApplicants => {
	return {
		type: GET_APPLICANTS,
		job,
		name
	};
};

export const gotApplicants = (results: Array<Applicant>, name: string): GotApplicants => {
	return {
		type: GOT_APPLICANTS,
		results,
		name
	};
};

export const getApplicantsFailed = (
	error: { status: number; message: string },
	name: string
): GetApplicantsFailed => {
	return {
		type: GET_APPLICANTS_FAILED,
		error,
		name
	};
};

export const getApplicant = (id: string, name: string): GetApplicant => {
	return {
		type: GET_APPLICANT,
		id,
		name
	};
};

export const gotApplicant = (result: Applicant, name: string): GotApplicant => {
	return {
		type: GOT_APPLICANT,
		result,
		name
	};
};

export const getApplicantFailed = (
	error: { status: number; message: string },
	name: string
): GetApplicantFailed => {
	return {
		type: GET_APPLICANT_FAILED,
		error,
		name
	};
};
