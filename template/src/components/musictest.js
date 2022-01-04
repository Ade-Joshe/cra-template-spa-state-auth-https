import React from "react";
import { useGetResquest } from "../api/useRequestProcessor";

export function MusicTest () {
	const { data, isLoading } = useGetResquest(
		"https://catfact.ninja/fact",
		"facts"
	);
	console.log({ data, isLoading });

	return (
		<div>
			<h1>Cat facts</h1>
			<p>{data.fact}</p>
		</div>
	);
}
