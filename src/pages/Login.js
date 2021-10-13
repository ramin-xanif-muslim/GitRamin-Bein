import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';
import { putLogin } from '../actions/putLogin-actions.js/putLogin';
import { updateUpperheader, updateSubheader } from '../actions/getNavbar-action';
import { Link, Redirect } from 'react-router-dom';
import { logOut } from '../actions/putLogin-actions.js/logOut';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { updateTokenSessionExpired } from '../actions/getNavbar-action';
import './Login.css'
class Login extends Component {

    state = {
        redirect: false,
        error: undefined,

    }
    onFinish = (values) => {
        this.props.putLogin(values)

    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    componentDidMount() {

        localStorage.removeItem('user')
        this.props.updateTokenSessionExpired(false)
        this.props.updateUpperheader( !this.props.state.navbar.activeFrom  ? 'Əsas' : this.props.state.navbar.activeSubItem, this.props.state.navbar.activeFrom )
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.state.login.isLoggedIn != this.props.state.login.isLoggedIn) {
            this.setState({
                redirect: true,

            })
            this.props.updateTokenSessionExpired(false)


        }

        if (nextProps.state.login.error) {
            this.setState({
                error: 'Login və ya şifrə yanlışdır'
            })

        }
    }

    render() {
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect to="/p=dashboard" />
        }
        return (
            <div className='login_page'>

                <div className='lofin_form_wrapper'>
                    <h1 className='login_word_header'>Giriş</h1>
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
                            name="Login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Zəhmət olmasa login daxil edin!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
                        </Form.Item>

                        <Form.Item
                            name="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Zəhmət olmasa parolu daxil edin!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Parol"
                            />
                        </Form.Item>

                        <Form.Item className='login_bottom_side'>
                            <a className="login-form-forgot" href="">
                                Parolu unutmuşam
                            </a>

                            <Link to={{ pathname: '/registration' }} >Qeydiyyatdan keç</Link>

                        </Form.Item>

                        <Form.Item className='login_bottom_side login' style={{ alignContent: 'center' }}>
                            <Button loading={this.props.state.login.fetching} type="primary" htmlType="submit" className="login-form-button">
                                Daxil ol
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
    putLogin, logOut, updateUpperheader, updateSubheader, updateTokenSessionExpired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)




