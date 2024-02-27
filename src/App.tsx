import { Table } from "./components/Table";
import { useListProducts } from "./hooks/useListProducts";
import "@progress/kendo-theme-default/dist/all.css";

function App() {
	const { data, isLoading } = useListProducts();

	return <Table products={data?.products} total={data?.total} isLoading={isLoading} />;
}

export default App;
