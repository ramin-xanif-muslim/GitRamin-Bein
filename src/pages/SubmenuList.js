import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { List } from 'semantic-ui-react'
import LoaderHOC from '../components/LoaderHOC'
import { connect } from 'react-redux'
import { updateUpperheader } from '../actions/getNavbar-action'
import { updateButton } from '../actions/getButtons-action'
import { updateChangePage } from '../actions/getData-action'
import { exitModal } from '../actions/updateStates-action';
import { updateSearchInput } from '../actions/getData-action';
import queryString from 'query-string';
import { changeSubMenu } from '../actions/getNavbar-action';
class SubmenuList extends Component {
  state = {
    activeItem: this.props.activeItem,
    activeFrom: this.props.activeFrom,
    firstLoading: false
  }



  handleItemClick = (e, { name, from }) => {
    if (this.props.state.stateChanges.changed) {
      e.preventDefault()
      e.stopPropagation()
      this.props.exitModal(true, from, name)

    }
    else {
      this.props.exitModal(false)
      this.setState({ activeItem: name })
      this.props.changeSubMenu('')
      this.props.updateUpperheader(name, from)
      this.props.updateButton(name)
      this.props.updateSearchInput('')
      this.props.state.datas.changePage == false ? console.log('changepage falsedi') : this.props.updateChangePage(true)
    }

  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.state.navbar.submenu && this.props.state.navbar.submenu != nextProps.state.navbar.submenu) {
      this.setState({
        activeItem: nextProps.state.navbar.submenu
      })
    }
  }

  render() {

    var data = this.props.submenu.navbar
    var i = 0;
    var id = this.props.submenu.id
    const { activeItem } = this.state

  
    const menuList = (

      <List className='d-flex' >

        {

          Array.isArray(data) ?
            data.filter(d => d.ParentId === id).map(d =>
              <List.Item
                key={i++}
                as={Link}
                from={d.Url}
                to={`/${d.Url}`}
                active={activeItem === d.Name}
                name={d.Name}
                onClick={this.handleItemClick}
                className='sub_header_items'
              >
                {d.Name}
              </List.Item>
            )
            : ''
        }
      </List >
    )

 

    return (
      menuList
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = {
  updateUpperheader, updateButton, updateChangePage, updateSearchInput, exitModal, changeSubMenu
}


export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(SubmenuList, 'submenu'))
