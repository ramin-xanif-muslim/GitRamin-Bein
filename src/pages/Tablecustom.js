import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Dropdown, Menu, Checkbox } from 'antd';
import Trans from '../usetranslation/Trans'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import { Redirect, Link } from 'react-router-dom';
import { updateColName, updateColNameChecked } from '../actions/updateColName';
import updateSettings from '../actions/updateSetting';
var data = [];
var columnsUpdated = []
var translatedCols = []
var translatedColsWrapper = []


class TableCustom extends React.Component {


  state = {
    value: false,
    checkedColumns: this.props.checkedColumns,
    visibleMenuSettings: false,
    columns: this.props.columns.filter(c => c.hidden == false),
    initialColumns: [],
    selectedRowKeys: [],
    redirect: false,
    selectedRowId: '',
    redirectto: this.props.editPage
  };

  componentWillUpdate(nextProps, nextState) {
    data = nextProps.datas
    columnsUpdated = nextProps.columns
  }

  componentDidMount() {
    data = this.props.datas
    this.setState({ initialColumns: this.props.columns })
    this.setState({ initialcheckedColumns: this.props.tableHeaders })
  }
  handleVisibleChange = flag => {
    this.setState({ visibleMenuSettings: flag });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onClickRow = (record) => {
    return {
      onClick: () => {
        this.setState({
          redirect: true,
          selectedRowId: record.Id,
          redirectname: this.props.redirectTo
        })
      },
    };
  }
  onChange = (e) => {
    var intialcolumns = this.state.initialColumns
    var intialcheckedcolumns = this.state.initialcheckedColumns
    //table headers replaced true/false starts
    var findelement;
    var findelementindex;
    var replacedElement
    findelement = intialcolumns.find(c => c.dataIndex === e.target.id)
    findelementindex = intialcolumns.findIndex(c => c.dataIndex === e.target.id)
    findelement.hidden = !e.target.checked
    replacedElement = findelement
    intialcolumns.splice(findelementindex, 1, { ...findelement, ...replacedElement });
    this.setState({ intialcolumns })
    var filtered = this.state.initialColumns.filter(c => c.hidden == false)
    this.setState({ columns: filtered })
    this.props.updateColName(filtered)

    //table headers replaced true/false ends


    //table columns show/hide starts

    var findelementcheck;
    var findelementindexcheck;
    var replacedElementcheck;
    findelementcheck = intialcolumns.find(c => c.dataIndex === e.target.id)
    findelementindexcheck = intialcolumns.findIndex(c => c.dataIndex === e.target.id)
    findelementcheck.hidden = !e.target.checked
    replacedElementcheck = findelementcheck
    intialcheckedcolumns.splice(findelementindexcheck, 1, { ...findelementcheck, ...replacedElementcheck });
    this.setState({ intialcheckedcolumns })
    this.props.updateColNameChecked(intialcheckedcolumns)
    //table columns show/hide ends

    this.props.updateSettings(replacedElement)


  }





  render() {

    translatedCols = []
    translatedColsWrapper = []
    if (this.state.redirectname != '') {
      if (this.state.redirect) {
        return <Redirect push to={`/${this.state.redirectto}/${this.state.selectedRowId}`} />;
      }

    }


    translatedColsWrapper = (
      Object.values(this.state.columns).map(c => translatedCols.push({ title: <Trans word={c.dataIndex} />, dataIndex: c.dataIndex, hidden: c.hidden, onSort : c.onSort }))
    );
    translatedColsWrapper = translatedCols
    console.log(this.state.columns)
    console.log(translatedColsWrapper)
    var i = 1
    const { selectedRowKeys } = this.state;
    var load = false
    this.props.state.datas.changePage === true ? load = true : load = false

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };



    const menu = (
      <Menu>
        <Menu.ItemGroup title="Columns" >
          {

            Object.values(this.props.tableHeaders).map(d => (
              <Menu.Item key={i++}><Checkbox id={d.dataIndex} hidden={d.hidden} onChange={this.onChange} defaultChecked={!d.hidden} >{d.title}</Checkbox></Menu.Item>
            ))

          }
        </Menu.ItemGroup>
      </Menu>
    );


    return (
      <div>
        <Dropdown
          overlay={menu}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visibleMenuSettings}
        >
          <Button> <Trans word={'show/hide'} /></Button>
        </Dropdown>
        <Table loading={load}  rowSelection={rowSelection} pagination={false} columns={translatedColsWrapper} dataSource={data} 
          onRow={this.onClickRow}
        />

      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  state
})
const mapDispatchToProps = {
  fetchData, updateColName, updateColNameChecked, updateSettings
}
export default connect(mapStateToProps, mapDispatchToProps)(TableCustom)
