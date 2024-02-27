import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingPanel } from "../components/LoadingPanel";
import { BrowserRouter } from "react-router-dom";
import { Table } from "../components/Table";
import { products } from "./Table.spec";

describe("Test loading panel", () => {
	it("should show loading spinner", () => {
		render(<LoadingPanel />);

		expect(screen.getByText("Loading")).toBeDefined();
	});

	it("should show loading spinner on table component", () => {
		render(
			<BrowserRouter>
				<Table products={products} total={products.length} isLoading={true} />
			</BrowserRouter>,
		);
		expect(screen.queryByText("Loading")).toBeDefined();
	});
});
