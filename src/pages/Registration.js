import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';
import { updateUpperheader, updateSubheader } from '../actions/getNavbar-action';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { API_LOGIN } from '../config/env';
import MaskedInput from 'antd-mask-input'
import { putLogin } from '../actions/putLogin-actions.js/putLogin';

import { Modal } from 'antd';
import axios from 'axios';



import './Login.css'
var pat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
var patName = /^([a-zA-Z]{4,})?$/

class Registration extends Component {

    state = {
        redirect: false,
        error: undefined,
        value: '',
        visible: false,
        loading:false


    }
    onFinish = (values) => {
        this.sendRegOne(values).then(res => res.data.Headers.ResponseStatus === '0' ? this.setState({
            visible: true,
            objectReg : values
        }) : this.setState({
            visible: false
        }))

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.login.isLoggedIn != this.props.state.login.isLoggedIn) {
            this.setState({
                redirect: true
            })

        }
   
    }

    onChange = (e) => {
        this.setState({
            value :e.target.value
        })
     
    }
    handleOk = () => {
        this.setState({
            loading:true
        })
        var logdata = {}
        logdata.Login  = 'admin@'+this.state.objectReg.Login
        logdata.Password  =  this.state.objectReg.password
        this.sendRegisterPhp().then(res=> res.data.Headers.ResponseStatus === '0' ? this.props.putLogin(logdata) :   this.setState({loading:false }))
    };

    handleCancel = () => {
        this.setState({ visible: false,value:'',loading:false });
    };

    async sendRegOne(object) {
        const res = await axios.post(`${API_LOGIN}/regone.php?login=${object.Login}&phone=${object.mobile}&password=${object.password}`);
        return await res;
    }

    
    async sendRegisterPhp() {
        const res = await axios.post(`${API_LOGIN}/register.php?login=${this.state.objectReg.Login}&phone=${this.state.objectReg.mobile}&password=${this.state.objectReg.password}&code=${this.state.value}`);
        return await res;
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/p=dashboard" />
        }

        return (
            <div className='login_page'>
                <Modal
                    visible={this.state.visible}
                    className='reg_modal'
                    title="Qeydiyyat"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Geri
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Davam et
                        </Button>

                    ]}
                >
                    <Input onChange={this.onChange} value={this.state.value} />

                </Modal>

                <div className='lofin_form_wrapper'>
                    <h1 className='login_word_header'>Qeydiyyat</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label='Login'
                            name="Login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Zəhmət olmasa, login daxil edin',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {

                                        if (!value || patName.test(value)) {

                                            return Promise.resolve();
                                        }


                                        return Promise.reject(new Error('İstifadəçi adı minimum 4 hərfdən ibarət olmalıdır'));
                                    },
                                }),
                            ]}
                        >
                            <Input addonBefore="admin@" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Şifrə"
                            rules={[
                                {
                                    required: true,
                                    message: 'Zəhmət olmasa, şifrənizi daxil edin',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {

                                        if (!value || pat.test(value)) {

                                            return Promise.resolve();
                                        }


                                        return Promise.reject(new Error('Şifrənizdə 6 və ya daha çox simvol və ən azı bir rəqəm olmalıdır.Xüsusi simvollara (#,@,#,!,$,_,-,+,*) icazə verilmir'));
                                    },
                                }),

                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Şifrəni təkrarla"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Şifrəni təkrarla',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Şifrələr eyni deyil'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Mobil nömrəsi"
                            name="mobile"

                            rules={[
                                {
                                    required: true,
                                    message: 'Zəhmət olmasa, mobil nömrənizi daxil edin',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        console.log(value)
                                        if (!value || (value.slice(7, 9) == '55' || value.slice(7, 9) == '60' || value.slice(7, 9) == '99' || value.slice(7, 9) == '51' || value.slice(7, 9) == '10' || value.slice(7, 9) == '50' || value.slice(7, 9) == '70' || value.slice(7, 9) == '77')) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Düzgün nömrə daxil edin...'));
                                    },
                                }),

                            ]}
                        >
                            <MaskedInput
                                ref={this.inputMaskRef}
                                mask="(+994) 11-111-11-11"
                                placeholderChar={'_'}
                            />
                        </Form.Item>



                        <Form.Item className='login_bottom_side login' style={{ alignContent: 'center' }}>
                            <Button loading={this.props.state.login.fetching} type="primary" htmlType="submit" className="login-form-button">
                                Qydiyyatdan keç
                            </Button>
                        </Form.Item>
                    </Form>

                    <p style={{ color: "red", display: this.state.error ? 'block' : 'none' }}>{this.state.error}</p>
                </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    putLogin, updateUpperheader, updateSubheader,putLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)




