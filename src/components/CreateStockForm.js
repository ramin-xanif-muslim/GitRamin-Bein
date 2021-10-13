import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { Col, Row, Collapse } from 'antd';
import buttonsNames from '../ButtonsNames/NotDocs/buttonsNames'
import Trans from '../usetranslation/Trans';
import DocButtons from '../components/DocButtons';
import './Form.css'
import './Colors.css'
import './ButtonsWrapper.css'
import {
    Form,
    Input,
    Button,
    TreeSelect,
    Menu,
    Dropdown
} from 'antd';


const { TextArea } = Input
var customCascader = [];
var newArr = []
var pid;
var suffixed
function convert(array) {
    var map = {}
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]
        if (!(obj.id in map)) {
            map[obj.id] = obj
            map[obj.id].children = []
        }

        if (typeof map[obj.id].name == 'undefined') {
            map[obj.id].id = obj.id
            map[obj.id].name = obj.name
            map[obj.id].parent = obj.parent
            map[obj.id].value = obj.value
            map[obj.id].label = obj.label
        }

        var parent = obj.parent || '-';
        if (!(parent in map)) {
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.id])
    }
    return map['-']
}




class CreateStockForm extends Component {
    formRef = React.createRef();


    componentDidMount() {
        customCascader = []
        customCascader = []
    }

    state = {
        errorFields: [],
    }

    shouldComponentUpdate(nextProps) {

        if (nextProps.datas !== this.props.datas) {
            return true;
        } else {
            return false;
        }
    }
    onFinish = (values) => {
        console.log('Success:', values);
        this.props.putData('stocks', values)
    };


    onFinishFailed = (values) => {
        this.setState({
            errorFields: values.errorFields
        })


    }

    render() {

        newArr = []
        Object.values(this.props.datas).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })

        newArr = convert(customCascader)

        console.log(newArr)
        const menu = (
            <Menu>

                <Menu.Item key="0">
                    <Button className='flex_directon_col_center'>
                        Anbarl  sili
                    </Button>
                </Menu.Item>
                <Menu.Divider />

            </Menu>
        );

        const { errorFields } = this.state
        return (
            <div className='table_holder'>
                <Row>
                    <Col xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'>Anbar</h2>
                    </Col>
                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>
                        {
                            this.props.state.stateChanges.openCreateModal ? '' : <DocButtons errorFields={errorFields} from='p=product' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                        }

                        <div className='form_header_right_buttons_wrapper'>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Button className='form_setting_icon_wrapper flex_directon_col_center' onClick={e => e.preventDefault()}>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                </Button>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col xs={24} md={24} xl={24}>

                        <Form id='myForm' ref={this.formRef}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            name="basic"
                            initialValues={{


                            }}
                            layout="horizontal"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >

                            <Row className='main_form_side'>
                                <Col xs={24} md={20} xl={24} className='left_form_wrapper'>
                                    <Form.Item
                                        label={<Trans word={'Group Name'} />}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, anbar adını  qeyd edin..',
                                            },
                                        ]}
                                    >
                                        <Input allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label={<Trans word={'Description'} />}
                                        name="description"
                                    >
                                        <TextArea allowClear />
                                    </Form.Item>


                                    <Form.Item
                                        label='Yerləşdiyi anbar'
                                        name='parentid'
                                    >
                                        <TreeSelect
                                            allowClear
                                            treeData={newArr.children}
                                        />
                                    </Form.Item>
                                </Col>


                            </Row>

                            {
                                this.props.state.stateChanges.openCreateModal ? <Form.Item label="">
                                    <Button htmlType="submit" className='customsavebtn'>Yadda saxla</Button>
                                </Form.Item> : ''
                            }
                        </Form>
                    </Col>

                </Row>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    putData
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CreateStockForm, 'datas'))