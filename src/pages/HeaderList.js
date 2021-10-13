import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { updateSubheader } from '../actions/getNavbar-action'
import { connect } from 'react-redux'
import LoaderHOC from '../components/LoaderHOC'
import img_brand from '../images/brand.png'
import { openSettingPage } from '../actions/updateStates-action'
import DropdownLogin from '../components/DropdownLogin'
import {
    BellOutlined,
    QuestionCircleOutlined,
    UserOutlined
} from '@ant-design/icons'

class HeaderList extends Component {
    state = { activeItem: this.props.activeItem }
    handleItemClick = (e, { name, parent_id }) => {
        this.setState({ activeItem: name })
        this.props.openSettingPage(false)
        this.props.updateSubheader(parent_id, name)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.state.navbar.activeItem != this.state.activeItem) {
            this.setState({
                activeItem: nextProps.state.navbar.activeItem
            })
        }
    }
    render() {
        const data = this.props.menus
        var i = 0;
        const { activeItem } = this.state


        return (
            <div className='main_header_wrapper'>
                <Menu pointing className='main_header'>

                    <Menu.Menu position='left'>
                        <Menu.Item>

                            <img src={img_brand} />
                        </Menu.Item>
                    </Menu.Menu>

                    {
                        Array.isArray(data) ?
                            data.filter(d => d.ParentId === '0').map(m =>
                                < Menu.Item
                                    className='main_header_items custom_flex_direction'
                                    key={i++}
                                    name={m.Name}
                                    parent_id={m.Id}
                                    active={activeItem === m.Name}
                                    onClick={this.handleItemClick}
                                >
                                    <img className='small_logo_pics' src={`/images/${m.Icon}.png`} />
                                    <span>{m.Name}</span>
                                </Menu.Item>

                            )
                            : ''

                    }

                    <Menu.Menu position='right'>
                        <Menu.Item className='main_header_items custom_flex_direction profile_icons_wrapper'>
                            <img className='small_logo_pics custom_width' src={`/images/help.png`} />
                        </Menu.Item>
                        <Menu.Item className='main_header_items custom_flex_direction profile_icons_wrapper'>
                            <img className='small_logo_pics custom_width' src={`/images/notification.png`} />
                        </Menu.Item>
                        <Menu.Item className='main_header_items custom_flex_direction profile_icons_wrapper'>
                            <DropdownLogin user={JSON.parse(localStorage.getItem('user')).Login} />
                        </Menu.Item>
                    </Menu.Menu>


                </Menu>

            </div >
        )
    }
}



const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = {
    updateSubheader, openSettingPage
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(HeaderList, 'menus'))