import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalHOC from '../modal/ModalrHOC'
import { Null_Content } from '../config/env';
import { saveRefLists, deleteRefLists, updateLoading } from '../actions/modifications/mod-actions';
import {
    List,
    Form,
    Input,
    Button,
    Popconfirm,
    Modal
} from 'antd';
const { Search } = Input;


class RefListWrapper extends Component {


    state = {
        listData: this.props.linkedRefList,
        filterText: '',
        visible: false,
        editRefItem: undefined
    }
    showDrawer = () => {
        this.setState({
            visible: true
        })

    };
    onClick = (e) => {
        this.showDrawer()
        this.setState({
            editRefItem: {
                Name: this.state.listData.find(c => c.Id === e.target.id).Name,
                RefId: this.props.refid,
                Id: e.target.id
            },
        })

    };


    deleteListItem = (id, e) => {
        e.stopPropagation()
        console.log(id)
        this.props.updateLoading()
        var delRefList = {}
        delRefList.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.deleteRefLists(delRefList, id,this.props.refid)
    }
    onFinish = (values) => {

        var newItemFilter = {}
        newItemFilter = values
        newItemFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.saveRefLists(newItemFilter, this.props.refid)
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    onSearch = (value) => {
        console.log(value)
    }
    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            filterText: e.target.value
        })
    }

    render() {
    

        const filteredList = this.state.listData ? this.state.listData.filter(
            item => {
                return item.Name.toLowerCase().indexOf(
                    this.state.filterText.toLowerCase()
                ) !== -1
            }
        ) : [];
        return (
            <div >
                <Search placeholder="input search text" onSearch={this.onSearch} onChange={this.onChange} style={{ width: 200 }} />
                <List
                    itemLayout="horizontal"
                    size="small"
                    locale={{ emptyText: Null_Content }}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={filteredList}
                    renderItem={item => (
                        <List.Item
                            key={item.Id}
                            actions={[<a key="list-loadmore-edit" href='/' id={item.Id} onClick={this.onClick}>dəyiş</a>, <Popconfirm onConfirm={(e) => this.deleteListItem(item.Id, e)} title="Silməyə əminsiniz?" okText="Bəli" cancelText="Xeyr">
                                <a href='/' key="list-loadmore-more">sil</a>
                            </Popconfirm>]}
                        >
                            <List.Item.Meta
                                title={<a href={'/'}>{item.Name}</a>}
                            />
                        </List.Item>
                    )}
                />

                <Modal
                    visible={this.state.visible}
                    title="Title"
                    afterClose={this.handleClearEdit}
                    destroyOnClose={true}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" htmlType='submit' type="primary" form='createnewlistitemform'>
                            Submit
                        </Button>,
                    ]}
                >

                    <Form
                        id='createnewlistitemform'
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            name: this.state.editRefItem ? this.state.editRefItem.Name : '',
                            id: this.state.editRefItem ? this.state.editRefItem.Id : '',
                            refid: this.state.editRefItem ? this.state.editRefItem.RefId : '',
                        }}
                        onFinish={this.onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Adı"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Zəhmət olmasa xananı doldurun!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="refid"
                            name="refid"
                            hidden={true}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="id"
                            name="id"
                            hidden={true}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                        </Form.Item>
                    </Form>
                </Modal>


            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    saveRefLists, deleteRefLists, updateLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(RefListWrapper, 'fetching'))
