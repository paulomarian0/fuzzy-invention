import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export interface IProduct {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

interface IProductResponse {
	products: IProduct[];
	total: number;
	skip: number;
	limit: number;
}

const getAllProducts = async (
	skip: number,
	take: number,
): Promise<IProductResponse> => {
	const response = await fetch(
		`https://dummyjson.com/products?limit=${take}&skip=${skip}`,
	);
	return response.json();
};

export const useListProducts = () => {
	const [searchParams] = useSearchParams();

	const skip = Number(searchParams.get("skip"));
	const take = Number(searchParams.get("take"));

	const query = useQuery<IProductResponse>({
		queryKey: ["products", skip, take],
		queryFn: () => getAllProducts(skip, take),
	});
	return query;
};
