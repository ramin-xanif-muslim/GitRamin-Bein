import { useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchPage, fecthFastPage, fetchFilterPage } from "../api";

import TableCustom from "../components/TableCustom";
import { Table } from "antd";
import { Redirect } from "react-router-dom";
import { Spin, Row, Col, Menu, Checkbox, Dropdown, Typography } from "antd";

import Buttons from "../components/Button";
import { Button, Icon } from "semantic-ui-react";
import FastSearch from "../components/FastSearch";
import FilterComponent from "../components/FilterComponent";
import { useTableCustom } from "../contexts/TableContext";
import enters from "../ButtonsNames/Enters/buttonsNames";
import { ConvertFixedTable } from "../config/function/findadditionals";
import { SettingOutlined } from "@ant-design/icons";
const { Text } = Typography;

export default function Profit() {
	const [redirect, setRedirect] = useState(false);
	const [direction, setDirection] = useState(1);
	const [defaultdr, setDefaultDr] = useState("");
	const [initialSort, setInitialSort] = useState("");
	const [fieldSort, setFieldSort] = useState("");
	const [allsum, setallsum] = useState(0);
	const [allprofit, setallprofit] = useState(0);
	const [allbonus, setallbonus] = useState(0);
	const [allbank, setallbank] = useState(0);
	const [editId, setEditId] = useState("");
	const [page, setPage] = useState(0);
	const [filtered, setFiltered] = useState(false);
	const [expandedRowKeys, setexpandedRowKeys] = useState(["4"]);
	const [children, setChildren] = useState([]);
	const [columnChange, setColumnChange] = useState(false);
	const [initial, setInitial] = useState(null);
	const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);
	const [initialfilter, setInitialFilter] = useState(null);

	const [filterChanged, setFilterChanged] = useState(false);
	const [visibleMenuSettingsFilter, setVisibleMenuSettingsFilter] =
		useState(false);

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

	const handleVisibleChangeFilter = (flag) => {
		setVisibleMenuSettingsFilter(flag);
	};

	const [documentList, setDocumentList] = useState([]);
	const [document, setDocument] = useState({});
	const { isLoading, error, data, isFetching } = useQuery(
		["profits", page, direction, fieldSort, doSearch, search, advanced],
		() => {
			return isFilter === true
				? fetchFilterPage(
						"profit",
						advancedPage,
						advanced,
						direction,
						fieldSort
				  )
				: doSearch
				? fecthFastPage("profit", page, search)
				: !isFilter && !doSearch
				? fetchPage("profit", page, direction, fieldSort)
				: null;
		}
	);

	var markObject;
	marks
		? (markObject = marks)
		: (markObject = JSON.parse(localStorage.getItem("marks")));
	const columns = useMemo(() => {
		return [
			{
				dataIndex: "Name",
				title: "Maddə",
			},
			{
				dataIndex: "Profit",
				title: "Mənfəət/Zərər",
			},
		];
	}, [defaultdr, initialSort, filtered, marks, advancedPage]);
	useEffect(() => {
		if (!isFetching) {
			setDocument(data.Body);
		} else {
			setDocument([]);
		}
	}, [isFetching]);

	useEffect(() => {
		if (Object.keys(document).length > 0) {
			var childrenArray = [];
			var spendItemsSum = 0;
			console.log(document.SpendItems);
			console.log(document);
			document.SpendItems.forEach((d) => {
				spendItemsSum += parseFloat(d.Amount);
			});
			document.SpendItems.forEach((d) => {
				childrenArray.push({
					key: d.Id,
					Name: d.Name,
					Profit: ConvertFixedTable(d.Amount),
				});
			});
			var clearProfit = isNaN(
				ConvertFixedTable(
					document.SaleSum - document.CostSum - spendItemsSum
				)
			)
				? "0"
				: ConvertFixedTable(
						document.SaleSum - document.CostSum - spendItemsSum
				  );
			var cycleProfit = isNaN(
				ConvertFixedTable(document.SaleSum - document.CostSum)
			)
				? "0"
				: ConvertFixedTable(document.SaleSum - document.CostSum);
			var datas = [
				{
					key: 1,
					Name: "Satış dövrüyyəsi",
					Profit: ConvertFixedTable(document.SaleSum) + " ₼",
				},
				{
					key: 2,
					Name: "Mayası",
					Profit: ConvertFixedTable(document.CostSum) + " ₼",
				},
				{
					key: 3,
					Name: "Dövrüyyə mənfəəti",
					Profit: cycleProfit + " ₼",
				},
				{
					key: 4,
					Name: "Xərclər (toplam)",
					Profit: ConvertFixedTable(spendItemsSum) + " ₼",
					children: childrenArray,
				},
				{
					key: 5,
					Name: <span className="boldContent">Təmiz mənfəət</span>,
					Profit: (
						<span
							className="boldContent"
							style={{
								color: clearProfit < 0 ? "red" : "initial",
							}}
						>
							{ConvertFixedTable(clearProfit)} ₼
						</span>
					),
				},
			];

			setDocumentList(datas);
		} else {
			setDocumentList([]);
		}
	}, [document]);

	const onChangeMenuFilter = (e) => {
		var initialCols = initialfilter;
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
		console.log(initialCols);
		setFilterChanged(true);
	};

	const filters = useMemo(() => {
		return [
			{
				key: "8",
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

	const filtermenus = (
		<Menu>
			<Menu.ItemGroup title="Sutunlar">
				{initialfilter
					? Object.values(initialfilter).map((d) => (
							<Menu.Item key={d.dataIndex}>
								<Checkbox
									id={d.dataIndex}
									onChange={(e) => onChangeMenuFilter(e)}
									defaultChecked={
										Object.values(filters).find(
											(e) => e.dataIndex === d.dataIndex
										).show
									}
								>
									{d.label}
								</Checkbox>
							</Menu.Item>
					  ))
					: null}
			</Menu.ItemGroup>
		</Menu>
	);

	const filterSetting = (
		<Dropdown
			trigger={["click"]}
			overlay={filtermenus}
			onVisibleChange={handleVisibleChangeFilter}
			visible={visibleMenuSettingsFilter}
		>
			<Button className="flex_directon_col_center">
				{" "}
				<SettingOutlined />
			</Button>
		</Dropdown>
	);

	console.log(documentList);
	if (isLoading) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="custom_display">
			<Row className="header_row">
				<Col xs={24} md={24} xl={4}>
					<div className="page_heder_left">
						<h2>Mənfəət və Zərər</h2>
					</div>
				</Col>
				<Col xs={24} md={24} xl={20}>
					<div className="page_heder_right">
						<div className="buttons_wrapper">
							<FastSearch className="search_header" />
							<Button
								className="filter_button buttons_click"
								onClick={() =>
									display === "none"
										? setdisplay("block")
										: setdisplay("none")
								}
								content="Filter"
							/>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} md={24} xl={24}>
					<FilterComponent settings={filterSetting} cols={filters} />
				</Col>
			</Row>

			<Table
				locale={{ emptyText: <Spin /> }}
				columns={columns}
				pagination={false}
				dataSource={documentList}
			/>
		</div>
	);
}
