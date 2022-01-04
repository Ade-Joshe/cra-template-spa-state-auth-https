import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Form } from "../components";

export function DefaultRoutes () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Form />} />

				{/* redirect to default if not found */}
				<Route path="*" element={<Navigate to={"/"} />} />
			</Routes>
		</BrowserRouter>
	);
}
