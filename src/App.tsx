import { Suspense } from "react";
import { Table } from "./components/Table";
import { useListProducts } from "./hooks/useListProducts";
import "@progress/kendo-theme-default/dist/all.css";

function App() {
	const { data, isLoading } = useListProducts();

	console.log(isLoading);

	return (
		<Suspense fallback={<h1>aaaaaaa</h1>}>
			<Table products={data?.products} total={data?.total} />
		</Suspense>
	);
}

export default App;
