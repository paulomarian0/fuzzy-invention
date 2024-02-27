import { useQuery } from "react-query";

const getAllProducts = async () => {
	const response = await fetch("https://dummyjson.com/products");
	return response.json();
};

export const useListProducts = () => {
	const query = useQuery({
		queryKey: "products",
		queryFn: getAllProducts,
	});
	return query;
};
