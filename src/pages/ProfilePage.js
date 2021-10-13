import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfile, putProfile } from '../actions/getProfile-action'
import { Form, Input, Button, Checkbox } from 'antd';
import MaskedInput from 'antd-mask-input'
import ModalHOC from '../modal/ModalrHOC';
var pat = /^[a-zA-Z0-9]+$/;

class ProfilePage extends Component {
    inputMaskRef = React.createRef();

    onFinish = (values) => {
        console.log(values)
        var senfFilter = {}
        senfFilter = values
        this.props.putProfile('company', senfFilter)
    }
    render() {

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} düzgün formatda deyil!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        console.log(this.props.state.profile)
        return (
            <div style={{ marginTop: '200px' }}>
                <h3>{JSON.parse(localStorage.getItem('user')).Login}</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        email: this.props.state.profile.profile.Email,
                        companyname: this.props.state.profile.profile.CompanyName,
                        accountnumber: this.props.state.profile.profile.AccountNumber,
                        mobile: this.props.state.profile.profile.Mobile,
                        voin: this.props.state.profile.profile.Voin,
                    }}
                    onFinish={this.onFinish}
                    validateMessages={validateMessages}
                >

                    <Form.Item
                        label="Eamil"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />


                    </Form.Item>

                    <Form.Item
                        label="Hesab nömrəsi"
                        name="accountnumber"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || pat.test(value)) {
                                        return Promise.resolve();

                                    }

                                    return Promise.reject(new Error('Hesab nömrəsi yalnız hərflərdən və rəqəmlərdən ibarət olmalıdır'));
                                },
                            }),
                        ]}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="VÖEN"
                        name="voin"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || pat.test(value)) {
                                        return Promise.resolve();

                                    }

                                    return Promise.reject(new Error('VÖEN yalnız hərflərdən və rəqəmlərdən ibarət olmalıdır'));
                                },
                            }),
                        ]}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Şirkət adı"
                        name="companyname"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mobil nömrəsi"
                        name="mobile"

                        rules={[

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

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchProfile, putProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(ProfilePage,'fetching'))
