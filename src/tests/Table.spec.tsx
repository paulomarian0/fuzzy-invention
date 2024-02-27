import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "../components/Table";
import { BrowserRouter } from "react-router-dom";

export const products = [
	{
		id: 1,
		title: "iPhone 9",
		description: "An apple mobile which is nothing like apple",
		price: 549,
		discountPercentage: 12.96,
		rating: 4.69,
		stock: 94,
		brand: "Apple",
		category: "smartphones",
		thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
		images: [
			"https://cdn.dummyjson.com/product-images/1/1.jpg",
			"https://cdn.dummyjson.com/product-images/1/2.jpg",
			"https://cdn.dummyjson.com/product-images/1/3.jpg",
			"https://cdn.dummyjson.com/product-images/1/4.jpg",
			"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
		],
	},
	{
		id: 2,
		title: "iPhone X",
		description:
			"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
		price: 899,
		discountPercentage: 17.94,
		rating: 4.44,
		stock: 34,
		brand: "Apple",
		category: "smartphones",
		thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
		images: [
			"https://cdn.dummyjson.com/product-images/2/1.jpg",
			"https://cdn.dummyjson.com/product-images/2/2.jpg",
			"https://cdn.dummyjson.com/product-images/2/3.jpg",
			"https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
		],
	},
];

describe("Test table", () => {
	it("should show iphone 9 on the list", () => {
		render(
			<BrowserRouter>
				<Table products={products} total={products.length} isLoading={false} />
			</BrowserRouter>,
		);

		expect(screen.getByText("iPhone 9")).toBeDefined();
	});

	it("should not show samsung galaxy s21 on the list", () => {
		render(
			<BrowserRouter>
				<Table products={products} total={products.length} isLoading={false} />
			</BrowserRouter>,
		);
		expect(screen.queryByText("Samsung Galaxy S21")).toBeNull();
	});
});
