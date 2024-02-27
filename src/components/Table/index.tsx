import { Grid, GridColumn, GridPageChangeEvent } from "@progress/kendo-react-grid";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PagerTargetEvent } from "@progress/kendo-react-data-tools";
import { IProduct } from "../../hooks/useListProducts";

interface PageState {
	skip: number;
	take: number;
}
interface ITableProps {
	products?: IProduct[];
	total?: number;
}

const initialDataState: PageState = { skip: 0, take: 10 };

const Table = ({ products, total }: ITableProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState<PageState>(initialDataState);
	const [pageSizeValue, setPageSizeValue] = useState<number | string | undefined>();

	const pageChange = (event: GridPageChangeEvent) => {
		const targetEvent = event.targetEvent as PagerTargetEvent;
		const take = event.page.take;

		if (targetEvent.value) {
			setPageSizeValue(targetEvent.value);
		}

		setPage({
			...event.page,
			take,
		});

		setSearchParams({
			skip: event.page.skip.toString(),
			take: event.page.take.toString(),
		});
	};

	useEffect(() => {
		if (!searchParams.get("skip") || !searchParams.get("take")) {
			setSearchParams({
				skip: initialDataState.skip.toString(),
				take: initialDataState.take.toString(),
			});
		}
	}, [searchParams]);

	return (
		<Grid
			data={products}
			skip={page.skip}
			take={page.take}
			total={total}
			pageable={{
				pageSizes: [5, 10, 15],
				pageSizeValue: pageSizeValue,
			}}
			onPageChange={pageChange}
		>
			<GridColumn field="id" title="ID" width="50px" />
			<GridColumn field="title" title="Title" width="300px" />
			<GridColumn field="brand" title="Brand" width="250px" />
			<GridColumn field="category" title="Category" />
			<GridColumn field="price" title="Price" />
			<GridColumn field="rating" title="Rating" />
		</Grid>
	);
};

export { Table };
