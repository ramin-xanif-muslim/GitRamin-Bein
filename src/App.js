import 'antd/dist/antd.css';
import './App.css'
import { Trans, useTranslation } from "react-i18next";
import Product from './pages/Product';
import Customer from './pages/Customer';
import Enter from './pages/Enter';
import Download from './pages/Download';
import Settlement from './pages/Settlements';
import Supply from './pages/Supply';
import Demand from './pages/Demand';
import SalePoint from './pages/SalePoint'
import Loss from './pages/Loss';
import TaxesPage from './pages/TaxesPage';
import CreateStock from './pages/CreateStock';
import Move from './pages/Move';
import { Result, Button } from 'antd';
import Transaction from './pages/Transaction';
import CreatePaymentOut from './pages/CreatePaymentOut';
import CreateInvoiceIn from './pages/CreateInvoiceIn';
import CreateInvoiceOut from './pages/CreateInvoiceOut';
import CreatePaymentIn from './pages/CreatePaymentIn';
import bc from './Check.js/bc';
import Sale from './pages/Sales';
import check80 from './Check.js/check80';
import checkPayment from './Check.js/checkPayment';
import invoice from './Check.js/invoice';
import EditSale from './pages/EditSale'
import Cashin from './pages/Cashins';
import Cashout from './pages/Cashouts';
import Profile from './pages/Profile';
import Return from './pages/Returns';
import DemandReturn from './pages/DemandReturn';
import SupplyReturn from './pages/SupplyReturn';
import Login from './pages/Login'
import StockBalance from './pages/StockBalance';
import CreateProduct from './pages/CreateProduct';
import CreateCustomer from './pages/CreateCustomer';
import CreateEnter from './pages/CreateEnter'
import CreateSupply from './pages/CreateSupply'
import CreateDemand from './pages/CreateDemand'
import CreateSalePoint from './pages/CreateSalePoint'
import CreateDemandReturn from './pages/CreateDemandReturn'
import CreateSupplyReturn from './pages/CreateSupplyReturn'
import CreateLoss from './pages/CreateLoss'
import CreateMove from './pages/CreateMove'
import Document from './pages/Document';
import Settings from './pages/Settings';
import Profit from './pages/Profit';
import { persistConfig } from './reducers/rootReducer';
import SaleReport from './pages/SaleReport'
import Cashes from './pages/Cashes';
import CreateProductGroup from './pages/CreateProductGroup';
import CreateCustomerGroup from './pages/CreateCustomerGroup';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Navbar from './pages/Navbar'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateLanguage } from './actions/getLang-action'
import { history } from './helpers/history'
import { Spin, Alert } from 'antd';
import CreateTransaction from './pages/CreateTransaction';
import Dashboard from './pages/Dashboard';
import { getToken } from './config/token';
import EditReturn from './pages/EditReturn';
import { fetchProfile } from './actions/getProfile-action';
import { Offline, Online } from "react-detect-offline"
import Taxes from './pages/Taxes';
import Registration from './pages/Registration';
import { getNotification } from './actions/notification/notification-action';


function App(props) {
  const { t, i18n } = useTranslation();
  const [redirect, setRedirect] = useState(false);
  const changeLanguage = (language) => {
    props.updateLanguage(language)
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user')) && !props.state.expired.expired) {
      if (props.state.navbar.activeFrom) {
        setRedirect(true);
      }
      props.getNotification()
      const interval = setInterval(() => props.getNotification(), 60000)
      return () => {
        clearInterval(interval);
      }
    }
  }, [])


  const routes = (
    <Switch>

      <Route exact path="/p=dashboard" component={Dashboard} />
      <Route exact path="/p=documents" component={Document} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/check80" component={check80} />
      <Route exact path="/checkPayment" component={checkPayment} />
      <Route exact path="/invoice" component={invoice} />
      <Route exact path="/bc" component={bc} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/createStock" component={CreateStock} />
      <Route exact path="/editStock/:id" component={CreateStock} />
      <Route exact path="/p=product" component={Product} />
      <Route exact path="/createProducts/" component={CreateProduct} />
      <Route exact path="/createSalePoints/" component={CreateSalePoint} />
      <Route exact path="/editProduct/:id" component={CreateProduct} />
      <Route exact path="/createGroup" component={CreateProductGroup} />
      <Route exact path="/editGroup/:id" component={CreateProductGroup} />
      <Route exact path="/p=customer" component={Customer} />
      <Route exact path="/createCustomers/" component={CreateCustomer} />
      <Route exact path="/editCustomer/:id" component={CreateCustomer} />
      <Route exact path="/createCustomerGroup" component={CreateCustomerGroup} />
      <Route exact path="/editCustomerGroup/:id" component={CreateCustomerGroup} />
      <Route path="/p=enter" component={Enter} />
      <Route exact path="/createEnter/" component={CreateEnter} />
      <Route exact path="/editEnter/:id" component={CreateEnter} />
      <Route path="/p=loss" component={Loss} />
      <Route exact path="/createLoss/" component={CreateLoss} />
      <Route exact path="/editLoss/:id" component={CreateLoss} />
      <Route path="/p=move" component={Move} />
      <Route exact path="/createMove/" component={CreateMove} />
      <Route exact path="/editMove/:id" component={CreateMove} />
      <Route path="/p=supply" component={Supply} />
      <Route exact path="/createSupply/" component={CreateSupply} />
      <Route exact path="/editSupply/:id" component={CreateSupply} />
      <Route path="/p=demand"
        render={() => (
          <Demand setting={props.state.settings.setting} menu={props.state.navbar.fetching} />
        )}
      />
      <Route exact path="/createDemand/" component={CreateDemand} />
      <Route exact path="/editDemand/:id" component={CreateDemand} />
      <Route path="/p=demandreturns"
        render={() => (
          <DemandReturn setting={props.state.settings.setting} menu={props.state.navbar.fetching} />
        )}
      />
      <Route exact path="/createDemandReturn/" component={CreateDemandReturn} />
      <Route exact path="/editDemandReturn/:id" component={CreateDemandReturn} />
      <Route path="/p=supplyreturns"
        render={() => (
          <SupplyReturn setting={props.state.settings.setting} menu={props.state.navbar.fetching} />
        )}
      />
      <Route exact path="/createSupplyReturn/" component={CreateSupplyReturn} />
      <Route exact path="/editSupplyReturn/:id" component={CreateSupplyReturn} />
      <Route exact path="/createPaymentOut/" component={CreatePaymentOut} />
      <Route exact path="/createInvoiceOut/" component={CreateInvoiceOut} />
      <Route exact path="/editPaymentOut/:id" component={CreatePaymentOut} />
      <Route exact path="/editInvoiceOut/:id" component={CreateInvoiceOut} />
      <Route exact path="/createPaymentIn/" component={CreatePaymentIn} />
      <Route exact path="/editPaymentIn/:id" component={CreatePaymentIn} />
      <Route exact path="/createInvoiceIn/" component={CreateInvoiceIn} />
      <Route exact path="/editInvoiceIn/:id" component={CreateInvoiceIn} />
      <Route path="/p=settlements" component={Settlement} />
      <Route path="/p=salereports" component={SaleReport} />
      <Route path="/p=sales" component={Sale} />
      <Route exact path="/editSale/:id" component={EditSale} />
      <Route path="/p=returns" component={Return} />
      <Route exact path="/editReturn/:id" component={EditReturn} />
      <Route path="/p=cashins" component={Cashin} />
      <Route path="/taxes" component={Taxes} />
      <Route path="/p=cashouts" component={Cashout} />
      <Route path="/p=stockbalance" component={StockBalance} />
      <Route path="/p=transactions" component={Transaction} />
      <Route exact path="/createTransaction/" component={CreateTransaction} />
      <Route exact path="/editTransaction/:id" component={CreateTransaction} />
      <Route path="/p=salepoints" component={SalePoint} />
      <Route path="/p=profit" component={Profit} />
      <Route path="/p=cashes" component={Cashes} />
      <Route path="/p=download" component={Download} />
    </Switch>
  )


  const pages = (active) => (
    <>
      <Navbar />
      {
        routes
      }
    </>
  )


  if (props.state.navbar.activeFrom == undefined || props.state.navbar.activeFrom == '') {
    return (
      <div className='mainDiv'>

        {
          JSON.parse(localStorage.getItem('user')) && !props.state.expired.expired ? pages(props.state.navbar.activeFrom) : <Redirect to="/login" />
        }
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        {/* 
    <button onClick={() => changeLanguage("en")}>EN</button>
    <button onClick={() => changeLanguage("aze")}>aze</button>
    <button onClick={() => changeLanguage("ru")}>rus</button> */}
      </div>
    )
  }
  else {
    return (

      <div className='mainDiv'>

        {
          JSON.parse(localStorage.getItem('user')) && !props.state.expired.expired ? pages(props.state.navbar.activeFrom) : <Redirect to="/login" />
        }
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        {
          JSON.parse(localStorage.getItem('user')) && !props.state.expired.expired && props.state.navbar.activeFrom ? <Redirect push to={`/${props.state.navbar.activeFrom}`} /> : <Redirect to="/login" />
        }




        {/* 
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("aze")}>aze</button>
        <button onClick={() => changeLanguage("ru")}>rus</button> */}
      </div>
    );

  }


}

const mapStateToProps = (state) => ({
  state
})
const mapDispatchToProps = {
  updateLanguage, getNotification, fetchProfile
}
export default connect(mapStateToProps, mapDispatchToProps)(App)



