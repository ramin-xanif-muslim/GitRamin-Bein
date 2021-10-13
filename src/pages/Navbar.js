import React, { Component } from 'react'
import { connect } from 'react-redux'
import getNavbar from '../actions/getNavbar-action'
import { Segment } from 'semantic-ui-react'
import SubmenuList from './SubmenuList'
import HeaderList from './HeaderList'
import 'semantic-ui-css/semantic.min.css'
import './header.css'
import getSetting from '../actions/getSettings'
import { getNotification } from '../actions/notification/notification-action'
import { getSpendItems } from '../actions/getSpendItems-action'
import { Redirect } from 'react-router-dom'
import { fetchProfile } from '../actions/getProfile-action'
import { getOwners } from '../actions/getGroups-action'

var md5 = require('md5');

class Navbar extends Component {
  componentDidMount() {
    this.props.getNavbar()
    this.props.fetchProfile('company', { token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' })


    if (this.props.state.settings.getsetting) {
      this.props.getSetting(md5(JSON.stringify(this.props.state.settings.getsetting)))
    }
    else {
      this.props.getSetting('1')

    }

  }


  render() {

    return (
      <div className={'my_header'} style={{ display: this.props.state.checkPage.show ? 'none' : 'initial' }}>

        <HeaderList menus={this.props.state.navbar.navbar} activeItem={this.props.state.navbar.activeItem} />
        <Segment style={{ display: this.props.state.navbar.activeItem === '' ? 'none' : 'flex' }}>
          <SubmenuList submenu={this.props.state.navbar} activeItem={this.props.state.navbar.activeSubItem}  activeFrom={this.props.state.navbar.activeFrom} />
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = {
  getNavbar, getSetting, getOwners, getSpendItems, getNotification, fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)







