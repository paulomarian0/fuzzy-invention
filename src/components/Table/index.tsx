import { Grid, GridColumn } from "@progress/kendo-react-grid";

interface ITableProps {
	products: any;
}

const Table = ({ products }: ITableProps) => {
	return (
		<Grid
			data={products}
			pageable={{
				buttonCount: 10,
				pageSizes: [5, 10, 15, 20],
				pageSizeValue: 5,
			}}
		>
			<GridColumn field="id" title="ID" width="40px" />
			<GridColumn field="title" title="Title" width="300px" />
			<GridColumn field="brand" title="Brand" width="250px" />
			<GridColumn field="category" title="Category" />
			<GridColumn field="price" title="Price" />
			<GridColumn field="rating" title="Rating" />
		</Grid>
	);
};

export { Table };
