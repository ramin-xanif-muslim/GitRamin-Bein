import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Tag } from 'antd';
import { fetchDataFast, fetchData, fetchProfit } from '../actions/getData-action';
import filterObject from '../config/filterObject';
import './Tag.css'
import moment from 'moment';
import 'moment/locale/az';
moment.locale('az');



export const FilterDateComponent = (props) => {
    const [active, setActive] = useState(props.from === 'salereports' || props.from === 'sales' ||  props.from === 'returns'   ? 'today' : props.from === 'profit' || props.from === 'cashins' || props.from === 'cashouts' ? 'thisMonth' : '');
    console.log('active', active)

    const getThisDay = () => {
        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        filterObject.momb = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        filterObject.mome = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')

        if (props.from === 'profit') {
            props.fetchProfit(props.from, filterObject)

        }
        else {
            props.fetchData(props.from, filterObject)

        }
        setActive('today')
    }
    const getYesterday = () => {

        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        filterObject.momb = moment().subtract(1, "day").startOf('day').format('YYYY-MM-DD HH:mm:ss')
        filterObject.mome = moment().subtract(1, "day").endOf('day').format('YYYY-MM-DD HH:mm:ss')

        if (props.from === 'profit') {
            props.fetchProfit(props.from, filterObject)

        }
        else {
            props.fetchData(props.from, filterObject)

        }
        setActive('yesterday')

    }
    const getThisMonth = () => {
        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        filterObject.momb = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        filterObject.mome = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')

        if (props.from === 'profit') {
            props.fetchProfit(props.from, filterObject)

        }
        else {
            props.fetchData(props.from, filterObject)

        }
        setActive('thisMonth')

    }
    const getLastMonth = () => {
        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        filterObject.momb = moment().subtract(1, "month").startOf('month').format('YYYY-MM-DD HH:mm:ss')
        filterObject.mome = moment().subtract(1, "month").endOf('month').format('YYYY-MM-DD HH:mm:ss')

        if (props.from === 'profit') {
            props.fetchProfit(props.from, filterObject)

        }
        else {
            props.fetchData(props.from, filterObject)

        }
        setActive('lastMonth')

    }
    return (
        <div style={{ marginLeft: '50px' }} className='buttons_center'>
            <Tag className={`tag_renders_date today ${active === 'today' ? "active" : ""}`} onClick={getThisDay} color="blue">Bu gün</Tag>
            <Tag className={`tag_renders_date yesterday ${active === 'yesterday' ? "active" : ""}`} onClick={getYesterday} color="blue">Dünən</Tag>
            <Tag className={`tag_renders_date thisMonth ${active === 'thisMonth' ? "active" : ""}`} onClick={getThisMonth} color="blue">Bu ay</Tag>
            <Tag className={`tag_renders_date lastMonth ${active === 'lastMonth' ? "active" : ""}`} onClick={getLastMonth} color="blue">Keçən ay</Tag>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchData, fetchDataFast, fetchProfit

}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDateComponent)
