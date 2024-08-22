import type * as React from "react";
import { PageNav } from "./Nav";

export function Page(props: { children: React.ReactNode }) {
	return (
		<div class="page">
			<PageNav />
			<main class="main">{props.children}</main>
		</div>
	);
}
