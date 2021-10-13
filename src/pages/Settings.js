import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { FaWarehouse } from 'react-icons/fa';
import { MdSettings, MdInfo, MdImportExport } from 'react-icons/md';
import Profile from '../pages/Profile'
import Taxes from '../pages/Taxes'
import { FiUsers } from 'react-icons/fi';
import { BiMoney } from 'react-icons/bi';
import { BsListCheck } from 'react-icons/bs';

import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import { API_BASE } from '../config/env';
import { MdBrandingWatermark } from 'react-icons/md';
import { HiTemplate } from 'react-icons/hi';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { GiExpense } from 'react-icons/gi';
import { GoSettings } from 'react-icons/go';
import Trans from '../usetranslation/Trans';
import { fetchData, getTaxes } from '../actions/getData-action';
import StocksPage from './StocksPage';
import ModPage from './ModPage';
import TaxesPage from './TaxesPage';
import { getToken } from '../config/token';
import { getModPage } from '../actions/modifications/mod-actions';
import { Skeleton } from 'antd';
import SpendItemsPage from './SpendItemsPage';
import './Settings.css'
import { openSettingPage } from '../actions/updateStates-action';
import DepartmentPage from './DepartmentPage';
import FixError from './FixError';
import FixErrorPage from './FixErrorPage';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultPageName: 'stocks',
            loading: true

        }
    }

    state = {
        refList: []
    }
    componentDidMount() {
        var getFilter = {}
        getFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.fetchData('stocks', getFilter)
    }

    componentWillUnmount() {
        this.props.openSettingPage(false)
    }


    async getRefTypes(object) {
        const res = await axios.post(`${API_BASE}/attributes/getreftypes.php`, object);
        return await res;
    }

    changePage = (e) => {
        console.log(e)
        this.setState({
            defaultPageName: e.key,
            loading: true
        }, () => {
            var getFilter = {}
            getFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
            if (this.state.defaultPageName === 'attributes') {
                this.props.getModPage(getFilter, this.state.defaultPageName)
            }
            else if (this.state.defaultPageName === 'profile') {
                return
            }
            else if (this.state.defaultPageName === 'taxes') {
                return
            }

            else if (this.state.defaultPageName === 'check') {
                return
            }
            else {
                this.props.fetchData(this.state.defaultPageName, getFilter)

            }
        })
    }
    render() {
        return (
            <Layout className='settings_layout'>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Ayarlar</Breadcrumb.Item>
                        <Breadcrumb.Item> <Trans word={this.state.defaultPageName} /> </Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['stocks']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub0" icon={<MdInfo />} title="Məlumatlar">
                                    <Menu.Item onClick={this.changePage} icon={<CgProfile />} name='profile' key="profile">Profil</Menu.Item>
                                    <Menu.Item onClick={this.changePage} icon={<BiMoney />} name='taxes' key="taxes">Tariflər</Menu.Item>
                                    <Menu.Item onClick={this.changePage} icon={<BsListCheck />} name='errors' key="errors">Yoxlama</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub1" icon={<MdSettings />} title="Ayarlar">
                                    <Menu.Item onClick={this.changePage} icon={<FaWarehouse />} name='stocks' key="stocks">Anbarlar</Menu.Item>
                                    <Menu.Item disabled={true} onClick={this.changePage} icon={<FiUsers />} key="Users">Istifadəçilər</Menu.Item>
                                    <Menu.Item onClick={this.changePage} icon={<MdBrandingWatermark />} key="departments">Şöbələr</Menu.Item>
                                    <Menu.Item disabled={true} onClick={this.changePage} icon={<HiTemplate />} key="Templates">Şablonlar</Menu.Item>
                                    <Menu.Item onClick={this.changePage} icon={<GiExpense />} key="spenditems">Xərc maddələri</Menu.Item>
                                    <Menu.Item onClick={this.changePage} icon={<GoSettings />} key="attributes">Modifikasiyalar</Menu.Item>

                                </SubMenu>
                                <SubMenu key="sub2" icon={<MdImportExport />} title="İdxal & İxrac">
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>

                            {
                                this.state.defaultPageName == 'stocks' ? <StocksPage fetching={this.props.state.datas.loading} datas={this.props.state.datas.datas} /> :
                                    this.state.defaultPageName == 'attributes' ? this.props.state.mods.pageloading ? <Skeleton active /> : <ModPage refList={this.props.state.mods.refTypes} fetching={this.props.state.datas.loading} datas={this.props.state.datas.datas} /> :
                                        this.state.defaultPageName == 'spenditems' ? <SpendItemsPage fetching={this.props.state.datas.loading} datas={this.props.state.datas.datas} /> :
                                            this.state.defaultPageName == 'departments' ? <DepartmentPage fetching={this.props.state.datas.loading} datas={this.props.state.datas.datas} /> :
                                                this.state.defaultPageName == 'profile' ? <Profile /> :
                                                    this.state.defaultPageName == 'taxes' ? <Taxes /> :
                                                        this.state.defaultPageName == 'errors' ? <FixErrorPage fetching={this.props.state.datas.loading} datas={this.props.state.datas.datas} /> :
                                                            ''



                            }

                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchData, getModPage, getTaxes, openSettingPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
