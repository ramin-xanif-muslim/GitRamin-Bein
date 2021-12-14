import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPage, fecthFastPage, fetchFilterPage, fetchDocId } from "../api";

import TableCustom from "../components/TableCustom";
import { Table } from "antd";
import { Redirect } from "react-router-dom";
import { Spin, Row, Col, Menu, Checkbox, Dropdown, Typography } from "antd";
import { fetchLinkedDoc } from "../api";
import Buttons from "../components/Button";
import { Button, Icon } from "semantic-ui-react";
import FastSearch from "../components/FastSearch";
import FilterComponent from "../components/FilterComponent";
import { useTableCustom } from "../contexts/TableContext";
import enters from "../ButtonsNames/Enters/buttonsNames";
import { useCustomForm } from "../contexts/FormContext";

import { SettingOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SettlementsDrawer = React.lazy(() =>
	import("../components/SettlementsDrawer")
);
export default function Settlement() {
	const [redirect, setRedirect] = useState(false);
	const [direction, setDirection] = useState(1);
	const [defaultdr, setDefaultDr] = useState("descend");
	const [initialSort, setInitialSort] = useState("Moment");
	const [fieldSort, setFieldSort] = useState("Moment");
	const [allinsum, setallinsum] = useState(0);
	const [alloutsum, setalloutsum] = useState(0);
	const [allcurrentsum, setallcurrentsum] = useState(0);
	const [editId, setEditId] = useState("");
	const [page, setPage] = useState(0);
	const [filtered, setFiltered] = useState(false);

	const [columnChange, setColumnChange] = useState(false);
	const [initial, setInitial] = useState(null);
	const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);
	const {
		marks,
		setMarkLocalStorage,
		setMark,
		isFilter,
		advancedPage,
		setAdvancedPage,
		doSearch,
		search,
		advanced,
		setdisplay,
		display,
	} = useTableCustom();
	const { visibleDrawer, setVisibleDrawer, setcusid, cusid } =
		useCustomForm();
	const [documentList, setDocumentList] = useState([]);

	const [initialfilter, setInitialFilter] = useState(null);
	const [filterChanged, setFilterChanged] = useState(false);

	const { isLoading, error, data, isFetching } = useQuery(
		["settlements", page, direction, fieldSort, doSearch, search, advanced],
		() => {
			return isFilter === true
				? fetchFilterPage(
						"settlements",
						advancedPage,
						advanced,
						direction,
						fieldSort
				  )
				: doSearch
				? fecthFastPage("settlements", page, search)
				: !isFilter && !doSearch
				? fetchPage("settlements", page, direction, fieldSort)
				: null;
		}
	);
	useEffect(() => {
		setColumnChange(false);
		if (filtered) setFiltered(false);
	}, [columnChange, filtered]);

	var markObject;
	marks
		? (markObject = marks)
		: (markObject = JSON.parse(localStorage.getItem("marks")));
	const columns = useMemo(() => {
		return [
			{
				title: "№",
				dataIndex: "Order",
				show: true,
				render: (text, record, index) => index + 1 + 25 * advancedPage,
			},

			{
				dataIndex: "CustomerName",
				title: "Tərəf-müqabil",
				defaultSortOrder:
					initialSort === "CustomerName" ? defaultdr : null,
				show: initial
					? Object.values(initial).find(
							(i) => i.dataIndex === "CustomerName"
					  ).show
					: true,
				sorter: (a, b) => null,
			},

			{
				dataIndex: "PayIn",
				title: "Borc (alacaq)",
				show: initial
					? Object.values(initial).find(
							(i) => i.dataIndex === "PayIn"
					  ).show
					: true,
				render: (value, row, index) => {
					if (row.Amount > 0) {
						return row.Amount;
					}
				},
			},
			{
				dataIndex: "PayOut",
				title: "Borc (verəcək)",
				show: initial
					? Object.values(initial).find(
							(i) => i.dataIndex === "PayOut"
					  ).show
					: true,
				render: (value, row, index) => {
					if (row.Amount < 0) {
						return row.Amount;
					}
				},
			},
			{
				dataIndex: "Current",
				title: "Cari vəziyyət",
				show: initial
					? Object.values(initial).find(
							(i) => i.dataIndex === "Current"
					  ).show
					: false,
				render: (value, row, index) => {
					return row.Amount;
				},
			},
		];
	}, [defaultdr, initialSort, filtered, marks, advancedPage]);

	useEffect(() => {
		setInitial(columns);
	}, []);
	const filters = useMemo(() => {
		return [
			{
				key: "1",
				label: "Qarşı-tərəf",
				name: "customerNaame",
				type: "select",
				controller: "products",
				dataIndex: "productName",
				show: initialfilter
					? Object.values(initialfilter).find(
							(i) => i.dataIndex === "customerNaame"
					  ).show
					: true,
			},
			{
				key: "2",
				label: "Borclar",
				name: "debts",
				type: "select",
				controller: "products",
				dataIndex: "productName",
				show: initialfilter
					? Object.values(initialfilter).find(
							(i) => i.dataIndex === "debts"
					  ).show
					: true,
			},
			{
				key: "3",
				label: "Məbləğ",
				name: "docPrice",
				start: "amb",
				end: "ame",
				type: "range",
				dataIndex: "docPrice",
				show: initialfilter
					? Object.values(initialfilter).find(
							(i) => i.dataIndex === "docPrice"
					  ).show
					: true,
			},
			{
				key: "4",
				label: "Tarixi",
				name: "createdDate",
				type: "date",
				dataIndex: "createdDate",
				show: initialfilter
					? Object.values(initialfilter).find(
							(i) => i.dataIndex === "createdDate"
					  ).show
					: true,
			},
		];
	}, [filterChanged]);
	useEffect(() => {
		if (!isFetching) {
			setDocumentList(data.Body.List);
			setallinsum(data.Body.AllInSum);
			setalloutsum(data.Body.AllOutSum);
			setallcurrentsum(
				parseFloat(data.Body.AllInSum + data.Body.AllOutSum)
			);
		} else {
			setDocumentList([]);
		}
	}, [isFetching]);

	const editPage = (id) => {
		console.log(id);

		setcusid(id);
		setVisibleDrawer(true);
	};

	const handlePagination = (pg) => {
		setPage(pg - 1);
		setAdvancedPage(pg - 1);
	};
	function onChange(pagination, filters, sorter, extra) {
		setInitialSort(sorter.field);
		if (sorter.order === "ascend") {
			setDirection(0);
			setFieldSort(sorter.field);
			setDefaultDr("ascend");
		} else {
			setDirection(1);
			setFieldSort(sorter.field);
			setDefaultDr("descend");
		}
	}

	const handleVisibleChange = (flag) => {
		setVisibleMenuSettings(flag);
	};

	const onChangeMenu = (e) => {
		var initialCols = initial;
		var findelement;
		var findelementindex;
		var replacedElement;
		findelement = initialCols.find((c) => c.dataIndex === e.target.id);
		findelementindex = initialCols.findIndex(
			(c) => c.dataIndex === e.target.id
		);
		findelement.show = e.target.checked;
		replacedElement = findelement;
		initialCols.splice(findelementindex, 1, {
			...findelement,
			...replacedElement,
		});
		setFiltered(true);
	};

	const menu = (
		<Menu>
			<Menu.ItemGroup title="Sutunlar">
				{initial
					? Object.values(initial).map((d) => (
							<Menu.Item key={d.dataIndex}>
								<Checkbox
									id={d.dataIndex}
									onChange={(e) => onChangeMenu(e)}
									defaultChecked={
										Object.values(columns).find(
											(e) => e.dataIndex === d.dataIndex
										).show
									}
								>
									{d.title}
								</Checkbox>
							</Menu.Item>
					  ))
					: null}
			</Menu.ItemGroup>
		</Menu>
	);
	if (isLoading) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="custom_display">
			<Row className="header_row">
				<Col xs={24} md={24} xl={4}>
					<div className="page_heder_left">
						<h2>Borclar</h2>
					</div>
				</Col>
				<Col xs={24} md={24} xl={20}>
					<div className="page_heder_right">
						<div className="buttons_wrapper">
							<Button
								className="filter_button buttons_click"
								onClick={() =>
									display === "none"
										? setdisplay("block")
										: setdisplay("none")
								}
								content="Filter"
							/>
							<FastSearch className="search_header" />
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} md={24} xl={24}>
					<FilterComponent cols={filters} />
				</Col>
			</Row>
			<Row>
				<Col xs={24} md={24} xl={24} className="setting_button_wrapper">
					<Dropdown
						trigger={["click"]}
						overlay={menu}
						onVisibleChange={handleVisibleChange}
						visible={visibleMenuSettings}
					>
						<Button className="flex_directon_col_center">
							{" "}
							<SettingOutlined />
						</Button>
					</Dropdown>
				</Col>
			</Row>
			<Table
				rowKey="Name"
				columns={columns.filter((c) => c.show == true)}
				onChange={onChange}
				dataSource={documentList}
				summary={() => (
					<Table.Summary.Row>
						{columns
							.filter((c) => c.show === true)
							.map((c) => (
								<Table.Summary.Cell>
									<Text type="">
										{c.dataIndex === "PayIn"
											? allinsum + " ₼"
											: c.dataIndex === "PayOut"
											? alloutsum + " ₼"
											: c.dataIndex === "Current"
											? allcurrentsum + " ₼"
											: null}
									</Text>
								</Table.Summary.Cell>
							))}
					</Table.Summary.Row>
				)}
				locale={{ emptyText: <Spin /> }}
				pagination={{
					current: advancedPage + 1,
					total: data.Body.Count,
					onChange: handlePagination,
					defaultPageSize: 100,
					showSizeChanger: false,
				}}
				size="small"
				onRow={(r) => ({
					onDoubleClick: () => editPage(r.CustomerId),
				})}
			/>
			{visibleDrawer ? <SettlementsDrawer /> : null}
		</div>
	);
}
