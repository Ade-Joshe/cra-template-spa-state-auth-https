import React from "react";
import "./App.css";
import { DefaultRoutes } from "./routes";
import { useSelector } from "react-redux";

function App () {
	const userRole = useSelector((state) => state.auth?.profile);

	switch (userRole?.payload?.role) {
		case "":
			return 0;
		default:
			return <DefaultRoutes />;
	}
}

export default App;
