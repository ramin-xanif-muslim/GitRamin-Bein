import { combineReducers } from 'redux'
import datas from '../reducers/datas'
import langs from '../reducers/changeLanguage'
import changed from '../reducers/changed'
import groups from '../reducers/groups'
import barcode from '../reducers/barcode'
import navbar from '../reducers/navbars'
import putdatas from '../reducers/putdatas'
import docmodals from '../reducers/modal/docmodals'
import stateChanges from './stateChanges'
import colnames from './colnames'
import savedoc from './savedoc'
import checkPage from './checkPage/checkPage'
import spenditems from './spenditems'
import colnameschecked from './updatecolnameschecked'
import settings from './settings'
import auth from './login/auth'
import login from './login/login'
import message from './login/message'
import prices from './prices/prices'
import mods from './mods/mods'
import attributes from './attributes'
import profile from './profile/profile'
import dashboard from './dashboard'
import notifications from './notification/notifications'
import links from './links'
import expired from './expired/expired'
import marks from './marks'
import owdep from './owdep'
import percent from './percent'
import filters from './filter/filter'
import handleProduct from '../reducers/selectproductdocument'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist';


var persistedArr;
const user = localStorage.getItem('user')
export const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['langs', 'colnames', 'navbar', 'colnameschecked', 'settings','profile','owdep','marks','spenditems','notifications','prices']
}

const rootReducer = combineReducers({ datas, navbar, langs, groups, changed, barcode, putdatas, handleProduct, stateChanges, colnames, colnameschecked, settings, dashboard, owdep, percent, attributes, marks, links, docmodals, spenditems, filters, auth, message, login, checkPage,profile,mods,savedoc,expired,notifications,prices })



export default persistReducer(persistConfig, rootReducer)
