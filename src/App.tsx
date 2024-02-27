import { Table } from "./components/Table";
import { useListProducts } from "./hooks/useListProducts";
import "@progress/kendo-theme-default/dist/all.css";

function App() {
	const { data } = useListProducts();
	console.log(data);

	return (
		<>
			<Table products={data?.products} />
		</>
	);
}

export default App;
