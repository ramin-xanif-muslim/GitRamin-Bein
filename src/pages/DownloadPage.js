import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd';
import './Page.css'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


class GridExampleContainer extends Component {

    constructor(props) {
        super(props)

    }



    render() {
        return (
            <Row className={'table_holder_section downloadpage'}>
                <Col xs={24} md={24} xl={12}>
                    <div className='download_page_text_wrapper'>
                        <h2 className='infos'>Kassa Proqramı</h2>
                        <p className='infos'>
                            İstənilən cihaz ilə işləmək imkanı(PC-kompüter, NoteBook,
                            NetBook, Planşet): Onlayn və Offlayn rejimdə. Sadə və rahat
                            interfeys.Satışların qeydiyyatı, müştəriyə qaytarılacaq qalığın
                            göstərilməsi. Növbələrin açılıb bağlanması. Qaytarmalar ilə
                            hərəkat.Ştrixkod və Barkodun dəstəklənməsi.
                        </p>

                        <h5 className='infos'>
                            <span>Bein </span> kassa proqramı
                        </h5>
                        <p className='infos'>
                            Kassa proqramını əldə etmək üçün aşağıdakı düyməyə tıklayın.<br />
                            Şifrə tələb olduqda <span>"bein"</span> sözü daxil edin.
                        </p>
                    </div>
                </Col>
                <Col xs={24} md={24} xl={10}>
                    <div className='download_page_text_wrapper'>
                        <img className='download_page' src={`/images/download.jpg`} />
                    </div>
                    <div className='download_page_text_wrapper' style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>

                        <Button style={{ display: 'flex', alignItems: 'center' }} type="primary" icon={<DownloadOutlined />}>
                            <a className='download_button' href='/downloads/?p=release'>Endir</a>
                        </Button>
                    </div>

                </Col>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
