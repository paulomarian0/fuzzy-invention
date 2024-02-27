import { Grid, GridColumn, GridToolbar, GridPageChangeEvent } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PagerTargetEvent } from "@progress/kendo-react-data-tools";
import { IProduct } from "../../hooks/useListProducts";
import { LoadingPanel } from "../LoadingPanel";
import { Input } from "@progress/kendo-react-inputs";

interface PageState {
	skip: number;
	take: number;
}
interface ITableProps {
	products?: IProduct[];
	total?: number;
	isLoading?: boolean;
}

const initialDataState: PageState = { skip: 0, take: 10 };

const Table = ({ products, total, isLoading }: ITableProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filterValue, setFilterValue] = useState<string | undefined>();
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

	const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterValue(event.target.value);

		setSearchParams({
			...searchParams,
			filter: event.target.value,
		});
	};

	useEffect(() => {
		if (filterValue) return;

		if (!searchParams.get("skip") || !searchParams.get("take")) {
			setSearchParams({
				skip: initialDataState.skip.toString(),
				take: initialDataState.take.toString(),
			});
		}
	}, [searchParams]);

	return (
		<div>
			{isLoading && <LoadingPanel />}
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
				<GridToolbar>
					<div>
						<span
							style={{
								padding: "5px",
							}}
						>
							Search:
						</span>
						<span>
							<Input
								value={filterValue}
								onChange={(e) => onFilterChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
								style={{
									border: "2px solid #ccc",
									width: "300px",
									boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
								}}
							/>
						</span>
					</div>
				</GridToolbar>
				<GridColumn field="id" title="ID" width="50px" />
				<GridColumn field="title" title="Title" width="300px" />
				<GridColumn field="brand" title="Brand" width="250px" />
				<GridColumn field="category" title="Category" />
				<GridColumn field="price" title="Price" />
				<GridColumn field="rating" title="Rating" />
			</Grid>
		</div>
	);
};

export { Table };
