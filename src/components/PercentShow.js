import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import setPrice from '../actions/setPrice-action'

import {
    Form,
    InputNumber
} from 'antd';

class PercentShow extends Component {





    state = {
        percent: true,
        percentinput: isNaN(this.props.defpercent) ? 0 : isFinite(this.props.defpercent) ? this.props.defpercent : 0
    }
    handleOpenOrClosePercent = () => {
        this.setState({
            percent: !this.state.percent,

        })
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.defpercent)
        if (nextProps.defpercent !== this.props.defpercent) {
            this.setState({
                percentinput: isNaN(nextProps.defpercent) ? 0 : isFinite(nextProps.defpercent) ? nextProps.defpercent : 0
            })
        }
    }
    onChange = (e) => {
        this.setState({
            percentinput: e.target.value
        })
        var newPrice = parseFloat((this.props.buyprice * e.target.value / 100) + this.props.buyprice).toFixed(2)
        this.props.setPrice(newPrice)
    }


    render() {



        return (
            <div className='percent_wrapper'>
                <Button type='button' animated
                // e.preventDefault(), this.handleOpenOrClosePercent
                >
                    <Button.Content visible>  Faizlə göstər</Button.Content>
                    <Button.Content hidden>{this.state.percentinput ? this.state.percentinput : this.props.defpercent}</Button.Content>
                </Button>
                <Form.Item label='' onChange={this.onChange} hidden={this.state.percent}>
                    <InputNumber
                        value={this.state.percentinput}
                        min={0}
                        formatter={value => `${value}  %`}
                    />
                </Form.Item>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    setPrice
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentShow)