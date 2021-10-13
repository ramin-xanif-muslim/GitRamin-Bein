import React from 'react'
import { Statistic, Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { Trans, useTranslation } from "react-i18next";
import './dashboard.css'
import LoaderHOC from '../components/LoaderHOC'
import Chart from '../components/Chart'
import { getDaysBetweenDates } from '../Function/getDaysBetweenDates'
import moment from 'moment/min/moment-with-locales';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
moment.locale('az');


var startDate = moment().subtract(1, "month").format()
var endDate = moment().format()
var dailyArray = []

var chartJSON = []
dailyArray = []
dailyArray = getDaysBetweenDates(startDate, endDate)
dailyArray.map(p =>
    chartJSON.push({
        year: p
    })
)

function GridExampleContainer(props) {
    const { t, i18n } = useTranslation();

    return (

        <div className="site-statistic-demo-card">

            <Row>
                <Col xs={24} md={12} xl={6}>
                    <p>{t('salesdashboard')}</p>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('today')}
                                value={props.cardIndicators.Sales}
                                precision={2}
                                valueStyle={{ color: parseFloat(props.cardIndicators.Sales) >= parseFloat(props.cardIndicators.LastSales) ? '#3f8600' : '#cf1322' }}
                                prefix={parseFloat(props.cardIndicators.Sales) >= parseFloat(props.cardIndicators.LastSales) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('yesterday')}
                                value={props.cardIndicators.LastSales}
                                precision={2}
                                valueStyle={{ color: parseFloat(props.cardIndicators.Sales) <= parseFloat(props.cardIndicators.LastSales) ? '#3f8600' : '#cf1322' }}
                                prefix={parseFloat(props.cardIndicators.Sales) <= parseFloat(props.cardIndicators.LastSales) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                </Col>
                <Col xs={24} md={12} xl={6}>
                    <p>{t('profitdashboard')}</p>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('today')}
                                value={props.cardIndicators.Profit}
                                precision={2}
                                valueStyle={{ color: parseFloat(props.cardIndicators.Profit) >= parseFloat(props.cardIndicators.LastProfit) ? '#3f8600' : '#cf1322' }}
                                prefix={parseFloat(props.cardIndicators.Profit) >= parseFloat(props.cardIndicators.LastProfit) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('yesterday')}
                                value={props.cardIndicators.LastProfit}
                                precision={2}
                                valueStyle={{ color: parseFloat(props.cardIndicators.Profit) <= parseFloat(props.cardIndicators.LastProfit) ? '#3f8600' : '#cf1322' }}
                                prefix={parseFloat(props.cardIndicators.Profit) <= parseFloat(props.cardIndicators.LastProfit) ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                </Col>
                <Col xs={24} md={12} xl={6}>
                    <p>{t('financedashboard')}</p>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('balance')}
                                value={props.cardIndicators.CashesBalance}
                                precision={2}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('cashes')}
                                value={props.cardIndicators.LastCashesBalance}
                                precision={2}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                </Col>
                <Col xs={24} md={12} xl={6}>
                    <p>{t('stockbalancedashboard')}</p>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('cost')}
                                value={props.cardIndicators.StockBalance}
                                precision={2}
                                suffix="₼"
                            />
                        </Card>
                    </Col>
                    <Col xs={12} md={12} xl={23}>
                        <Card bordered={false}>
                            <Statistic
                                title={t('quantity')}
                                value={''}
                                precision={2}
                                suffix="əd"
                            />
                        </Card>
                    </Col>
                </Col>

            </Row>



            <Row style={{ marginTop: '20px' }} gutter={16}>
                <Col xs={16} md={16} xl={16}>
                    <Chart days={chartJSON} indicators={props.chartIndicators} />

                </Col>
            </Row>

        </div >

    )
}

export default LoaderHOC(GridExampleContainer, 'cardIndicators')
