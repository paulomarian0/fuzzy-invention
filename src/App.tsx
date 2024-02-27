import { useListProducts } from "./hooks/useListProducts";

function App() {
	const { data } = useListProducts();
	console.log(data);

	return <>aaaa</>;
}

export default App;
