import React from "react";
import { useFormik } from "formik";
import { formSchema } from "./formSchema";

export function Form () {
	const { values, handleChange } = useFormik({
		initialValues: { inputValue: "" },
		onSubmit: () => {},
		validationSchema: formSchema
	});

	return (
		<div style={{ backgroundColor: "red" }}>
			<form>
				<div>
					<label aria-label="Username">Username</label>
					<input
						className=""
						value={values.inputValue}
						name={"inputValue"}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label aria-label="Password">Password</label>
				</div>
			</form>
		</div>
	);
}
