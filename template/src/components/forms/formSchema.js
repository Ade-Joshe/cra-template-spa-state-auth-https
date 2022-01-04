import * as yup from "yup";

export const formSchema = yup.object({
	email: yup.string().email().required(),
	password: yup
		.string()
		.required("Phone Number is required")
		.test("isValid", "Minimum of 8 characters", (value) => {
			if (value?.length < 8) return false;
			else return true;
		})
});
