import React from "react";

export function AuthLayout ({ children }) {
	return (
		<div>
			<h1>This is the authentication layout!</h1>
			<br />
			{children}
		</div>
	);
}

AuthLayout.propTypes = { children: Node };
